import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import api, {
    demoLoginUser,
    getCurrentUser,
    setAuthToken,
} from "../services/api";
import { AuthContext } from "./authStore";

const AUTH_STORAGE_KEY = "ai_investment_auth";

const getStoredAuth = () => {
    try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => getStoredAuth()?.token || "");
    const [user, setUser] = useState(() => getStoredAuth()?.user || null);
    const [bootstrapping, setBootstrapping] = useState(Boolean(token));

    const persistSession = useCallback((authData) => {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
        setAuthToken(authData.token);
        setToken(authData.token);
        setUser(authData.user);
    }, []);

    const clearSession = useCallback(() => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setAuthToken("");
        setToken("");
        setUser(null);
    }, []);

    useEffect(() => {
        setAuthToken(token);
    }, [token]);

    useEffect(() => {
        let active = true;

        const hydrateUser = async () => {
            if (!token) {
                setBootstrapping(false);
                return;
            }

            try {
                const response = await getCurrentUser();

                if (active) {
                    persistSession({
                        token,
                        user: response.user,
                    });
                }
            } catch {
                if (active) {
                    clearSession();
                }
            } finally {
                if (active) {
                    setBootstrapping(false);
                }
            }
        };

        hydrateUser();

        return () => {
            active = false;
        };
    }, [clearSession, persistSession, token]);

    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    clearSession();
                }

                return Promise.reject(error);
            }
        );

        return () => api.interceptors.response.eject(interceptor);
    }, [clearSession]);

    const demoLogin = useCallback(async () => {
        const response = await demoLoginUser();
        persistSession(response);
        return response.user;
    }, [persistSession]);

    const logout = useCallback(() => {
        clearSession();
    }, [clearSession]);

    const value = useMemo(
        () => ({
            bootstrapping,
            isAuthenticated: Boolean(token && user),
            logout,
            demoLogin,
            token,
            user,
        }),
        [
            bootstrapping,
            demoLogin,
            logout,
            token,
            user,
        ]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
