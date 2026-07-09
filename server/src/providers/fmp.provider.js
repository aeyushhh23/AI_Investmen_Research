import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";
import {
    assertNonEmptyArray,
    ensureApiKey,
    requireUsableHistoricalData,
    requireUsableProfile,
    requireUsableQuote,
    toNumber
} from "../utils/providerValidation.js";
import { mapDailyRowsToCandles } from "../utils/providerMappers.js";

const apiKey = () => process.env.FMP_API_KEY;

export const getCompanyProfileFromFMP = async (symbol) => {
    ensureApiKey(apiKey(), "FMP");

    const response = await axiosClient.get(
        `${API_CONFIG.FMP_BASE_URL}/v3/profile/${symbol}`,
        { params: { apikey: apiKey() } }
    );

    const [profile] = assertNonEmptyArray(
        response.data,
        "FMP returned no profile data."
    );

    return requireUsableProfile({
        ticker: profile.symbol,
        name: profile.companyName,
        exchange: profile.exchangeShortName || profile.exchange,
        country: profile.country,
        currency: profile.currency,
        marketCapitalization: toNumber(profile.mktCap),
        ipo: profile.ipoDate,
        logo: profile.image,
        weburl: profile.website,
        finnhubIndustry: profile.industry
    }, "FMP");
};

export const getQuoteFromFMP = async (symbol) => {
    ensureApiKey(apiKey(), "FMP");

    const response = await axiosClient.get(
        `${API_CONFIG.FMP_BASE_URL}/v3/quote/${symbol}`,
        { params: { apikey: apiKey() } }
    );

    const [quote] = assertNonEmptyArray(
        response.data,
        "FMP returned no quote data."
    );

    return requireUsableQuote({
        c: toNumber(quote.price),
        h: toNumber(quote.dayHigh),
        l: toNumber(quote.dayLow),
        o: toNumber(quote.open),
        pc: toNumber(quote.previousClose),
        d: toNumber(quote.change),
        dp: toNumber(quote.changesPercentage)
    }, "FMP");
};

export const getHistoricalDataFromFMP = async (symbol) => {
    ensureApiKey(apiKey(), "FMP");

    const response = await axiosClient.get(
        `${API_CONFIG.FMP_BASE_URL}/v3/historical-price-full/${symbol}`,
        {
            params: {
                timeseries: 30,
                apikey: apiKey()
            }
        }
    );

    const historical = assertNonEmptyArray(
        response.data?.historical,
        "FMP returned no historical data."
    );

    return requireUsableHistoricalData(
        mapDailyRowsToCandles(historical),
        "FMP"
    );
};
