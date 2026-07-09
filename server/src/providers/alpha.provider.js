import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";
import {
    assertObject,
    ensureApiKey,
    requireUsableHistoricalData,
    requireUsableProfile,
    requireUsableQuote,
    toNumber
} from "../utils/providerValidation.js";
import { mapDailyRowsToCandles } from "../utils/providerMappers.js";

const apiKey = () => process.env.ALPHA_VANTAGE_API_KEY;

export const getCompanyProfileFromAlpha = async (symbol) => {
    ensureApiKey(apiKey(), "Alpha Vantage");

    const response = await axiosClient.get(API_CONFIG.ALPHA_VANTAGE_BASE_URL, {
        params: {
            function: "OVERVIEW",
            symbol,
            apikey: apiKey()
        }
    });

    const profile = assertObject(
        response.data,
        "Alpha Vantage returned invalid profile data."
    );

    return requireUsableProfile({
        ticker: profile.Symbol,
        name: profile.Name,
        exchange: profile.Exchange,
        country: profile.Country,
        currency: profile.Currency,
        marketCapitalization: toNumber(profile.MarketCapitalization),
        ipo: profile.IPODate,
        logo: "",
        weburl: "",
        finnhubIndustry: profile.Industry || profile.Sector
    }, "Alpha Vantage");
};

export const getQuoteFromAlpha = async (symbol) => {
    ensureApiKey(apiKey(), "Alpha Vantage");

    const response = await axiosClient.get(API_CONFIG.ALPHA_VANTAGE_BASE_URL, {
        params: {
            function: "GLOBAL_QUOTE",
            symbol,
            apikey: apiKey()
        }
    });

    const quote = assertObject(
        response.data?.["Global Quote"],
        "Alpha Vantage returned invalid quote data."
    );

    return requireUsableQuote({
        c: toNumber(quote["05. price"]),
        h: toNumber(quote["03. high"]),
        l: toNumber(quote["04. low"]),
        o: toNumber(quote["02. open"]),
        pc: toNumber(quote["08. previous close"]),
        d: toNumber(quote["09. change"]),
        dp: toNumber(String(quote["10. change percent"] || "").replace("%", ""))
    }, "Alpha Vantage");
};

export const getHistoricalDataFromAlpha = async (symbol) => {
    ensureApiKey(apiKey(), "Alpha Vantage");

    const response = await axiosClient.get(API_CONFIG.ALPHA_VANTAGE_BASE_URL, {
        params: {
            function: "TIME_SERIES_DAILY",
            symbol,
            outputsize: "compact",
            apikey: apiKey()
        }
    });

    const series = assertObject(
        response.data?.["Time Series (Daily)"],
        "Alpha Vantage returned no historical data."
    );

    const rows = Object.entries(series).slice(0, 30).map(([date, values]) => ({
        date,
        open: values["1. open"],
        high: values["2. high"],
        low: values["3. low"],
        close: values["4. close"],
        volume: values["5. volume"]
    }));

    return requireUsableHistoricalData(
        mapDailyRowsToCandles(rows),
        "Alpha Vantage"
    );
};
