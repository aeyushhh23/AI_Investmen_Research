import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";

export const getCompanyProfileFromFinnhub = async (symbol) => {

    const response = await axiosClient.get(
        `${API_CONFIG.FINNHUB_BASE_URL}/stock/profile2`,
        {
            params: {
                symbol,
                token: process.env.FINNHUB_API_KEY
            }
        }
    );

    return response.data;
};

export const getCompanyQuoteFromFinnhub = async (symbol) => {

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

export const getCompanyNewsFromFinnhub = async (symbol) => {

    const today = new Date();

    const from = new Date();

    from.setDate(today.getDate() - 30);

    const format = (date) => date.toISOString().split("T")[0];

    const response = await axiosClient.get(
        `${API_CONFIG.FINNHUB_BASE_URL}/company-news`,
        {
            params: {
                symbol,
                from: format(from),
                to: format(today),
                token: process.env.FINNHUB_API_KEY
            }
        }
    );

    return response.data;
};