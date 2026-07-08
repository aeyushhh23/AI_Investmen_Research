import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";

export const getFinancialMetricsFromFinnhub = async (symbol) => {

    const response = await axiosClient.get(
        `${API_CONFIG.FINNHUB_BASE_URL}/quote`,
        {
            params: {
                symbol,
                token: process.env.FINNHUB_API_KEY
            }
        }
    );

    return response.data;
};