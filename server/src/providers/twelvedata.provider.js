import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";
import {
    assertNonEmptyArray,
    assertObject,
    ensureApiKey,
    requireUsableHistoricalData,
    requireUsableProfile,
    requireUsableQuote,
    toNumber
} from "../utils/providerValidation.js";
import { mapDailyRowsToCandles } from "../utils/providerMappers.js";

const apiKey = () => process.env.TWELVE_DATA_API_KEY;

export const getCompanyProfileFromTwelveData = async (symbol) => {
    ensureApiKey(apiKey(), "Twelve Data");

    const response = await axiosClient.get(
        `${API_CONFIG.TWELVE_DATA_BASE_URL}/profile`,
        {
            params: {
                symbol,
                apikey: apiKey()
            }
        }
    );

    const profile = assertObject(
        response.data,
        "Twelve Data returned invalid profile data."
    );

    return requireUsableProfile({
        ticker: profile.symbol,
        name: profile.name,
        exchange: profile.exchange,
        country: profile.country,
        currency: profile.currency,
        marketCapitalization: toNumber(profile.market_cap),
        ipo: profile.ipo_date,
        logo: "",
        weburl: profile.website || "",
        finnhubIndustry: profile.industry || profile.sector
    }, "Twelve Data");
};

export const getQuoteFromTwelveData = async (symbol) => {
    ensureApiKey(apiKey(), "Twelve Data");

    const response = await axiosClient.get(
        `${API_CONFIG.TWELVE_DATA_BASE_URL}/quote`,
        {
            params: {
                symbol,
                apikey: apiKey()
            }
        }
    );

    const quote = assertObject(
        response.data,
        "Twelve Data returned invalid quote data."
    );

    return requireUsableQuote({
        c: toNumber(quote.close),
        h: toNumber(quote.high),
        l: toNumber(quote.low),
        o: toNumber(quote.open),
        pc: toNumber(quote.previous_close),
        d: toNumber(quote.change),
        dp: toNumber(quote.percent_change)
    }, "Twelve Data");
};

export const getHistoricalDataFromTwelveData = async (symbol) => {
    ensureApiKey(apiKey(), "Twelve Data");

    const response = await axiosClient.get(
        `${API_CONFIG.TWELVE_DATA_BASE_URL}/time_series`,
        {
            params: {
                symbol,
                interval: "1day",
                outputsize: 30,
                apikey: apiKey()
            }
        }
    );

    const values = assertNonEmptyArray(
        response.data?.values,
        "Twelve Data returned no historical data."
    );

    return requireUsableHistoricalData(
        mapDailyRowsToCandles(values),
        "Twelve Data"
    );
};
