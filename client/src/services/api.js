import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://ai-investmen-research.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
};

export const demoLoginUser = async () => {
    const response = await api.post("/api/auth/demo");

    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get("/api/auth/me");

    return response.data;
};

export const analyzeCompany = async (company) => {
    const response = await api.post("/api/analyze", {
        company,
    });

    return response.data;
};
export const getChart = async (symbol) => {

    const response = await api.get(`/api/chart/${symbol}`);

    return response.data.chart;
};

export const fetchCompanySuggestions = async (query) => {
    const response = await api.get("/apigit /search", {
        params: {
            query,
        },
    });

    return response.data.suggestions || [];
};

export default api;
