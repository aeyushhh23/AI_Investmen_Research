import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";
import {
    assertArray,
    ensureApiKey,
    requireUsableHistoricalData,
    requireUsableProfile,
    requireUsableQuote
} from "../utils/providerValidation.js";
import {
    getIsoDateRange,
    getUnixDateRange
} from "../utils/providerMappers.js";

export const getCompanyProfileFromFinnhub = async (symbol) => {
    ensureApiKey(process.env.FINNHUB_API_KEY, "Finnhub");

    const response = await axiosClient.get(
        `${API_CONFIG.FINNHUB_BASE_URL}/stock/profile2`,
        {
            params: {
                symbol,
                token: process.env.FINNHUB_API_KEY
            }
        }
    );

    return requireUsableProfile(response.data, "Finnhub");
};

export const getQuoteFromFinnhub = async (symbol) => {
    ensureApiKey(process.env.FINNHUB_API_KEY, "Finnhub");

    const response = await axiosClient.get(
        `${API_CONFIG.FINNHUB_BASE_URL}/quote`,
        {
            params: {
                symbol,
                token: process.env.FINNHUB_API_KEY
            }
        }
    );

    return requireUsableQuote(response.data, "Finnhub");
};

export const getCompanyQuoteFromFinnhub = getQuoteFromFinnhub;
export const getFinancialMetricsFromFinnhub = getQuoteFromFinnhub;

export const getHistoricalDataFromFinnhub = async (symbol) => {
    ensureApiKey(process.env.FINNHUB_API_KEY, "Finnhub");

    const { from, to } = getUnixDateRange(30);

    const response = await axiosClient.get(
        `${API_CONFIG.FINNHUB_BASE_URL}/stock/candle`,
        {
            params: {
                symbol,
                resolution: "D",
                from,
                to,
                token: process.env.FINNHUB_API_KEY
            }
        }
    );

    return requireUsableHistoricalData(response.data, "Finnhub");
};

export const getCompanyNewsFromFinnhub = async (symbol) => {
    ensureApiKey(process.env.FINNHUB_API_KEY, "Finnhub");

    const { from, to } = getIsoDateRange(30);

    const response = await axiosClient.get(
        `${API_CONFIG.FINNHUB_BASE_URL}/company-news`,
        {
            params: {
                symbol,
                from,
                to,
                token: process.env.FINNHUB_API_KEY
            }
        }
    );

    const articles = assertArray(
        response.data,
        "Finnhub returned invalid news data."
    );

    if (articles.length === 0) {
        throw new Error("Finnhub returned no news articles.");
    }

    return articles;
};
