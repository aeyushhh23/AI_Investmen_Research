import { Navigate, useLocation } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "../../context/useAuth";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { bootstrapping, isAuthenticated } = useAuth();

    if (bootstrapping) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
                <div className="glass flex items-center gap-3 px-6 py-4 text-sm font-semibold">
                    <LoaderCircle className="animate-spin text-cyan-300" size={18} />
                    Restoring secure session
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />
        );
    }

    return children;
};

export default ProtectedRoute;
