import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const analyzeCompany = async (company) => {
    const response = await api.post("/analyze", {
        company,
    });

    return response.data;
};
export const getChart = async (symbol) => {

    const response = await api.get(`/chart/${symbol}`);

    return response.data.chart;
};

export default api;