import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";
import {
    assertArray,
    assertNonEmptyArray,
    requireUsableHistoricalData,
    requireUsableProfile,
    requireUsableQuote,
    toNumber
} from "../utils/providerValidation.js";
import {
    getKnownSymbolMatches,
    getMarketCountry,
    getMarketCurrency
} from "../utils/symbolResolver.js";

const getYahooQuote = async (symbol) => {
    const response = await axiosClient.get(
        `${API_CONFIG.YAHOO_FINANCE_BASE_URL}/v8/finance/chart/${encodeURIComponent(symbol)}`,
        {
            params: {
                range: "1d",
                interval: "1m"
            }
        }
    );

    const [result] = assertNonEmptyArray(
        response.data?.chart?.result,
        "Yahoo Finance returned no chart data."
    );

    const meta = result.meta || {};
    const intraday = result.indicators?.quote?.[0] || {};
    const open = intraday.open?.find((value) => toNumber(value) !== null);
    const currentPrice = toNumber(meta.regularMarketPrice);
    const previousClose = toNumber(meta.previousClose || meta.chartPreviousClose);
    const change = currentPrice !== null && previousClose !== null
        ? currentPrice - previousClose
        : null;

    return {
        symbol: meta.symbol || symbol,
        shortName: meta.shortName,
        longName: meta.longName,
        fullExchangeName: meta.fullExchangeName,
        exchange: meta.exchangeName,
        currency: meta.currency,
        quoteType: meta.instrumentType,
        regularMarketPrice: currentPrice,
        regularMarketDayHigh: toNumber(meta.regularMarketDayHigh),
        regularMarketDayLow: toNumber(meta.regularMarketDayLow),
        regularMarketOpen: toNumber(open),
        regularMarketPreviousClose: previousClose,
        regularMarketChange: change,
        regularMarketChangePercent: change !== null && previousClose
            ? (change / previousClose) * 100
            : null
    };
};

const getYahooSearchQuote = async (symbol) => {
    const response = await axiosClient.get(
        `${API_CONFIG.YAHOO_FINANCE_BASE_URL}/v1/finance/search`,
        {
            params: {
                q: symbol,
                quotesCount: 1,
                newsCount: 0
            }
        }
    );

    const [quote] = assertNonEmptyArray(
        response.data?.quotes,
        "Yahoo Finance returned no profile data."
    );

    return quote;
};

export const searchCompaniesFromYahoo = async (query) => {
    const seededSymbols = getKnownSymbolMatches(query);
    const seededQuotes = await Promise.all(
        seededSymbols.map((symbol) => (
            getYahooSearchQuote(symbol).catch(() => null)
        ))
    );

    const response = await axiosClient.get(
        `${API_CONFIG.YAHOO_FINANCE_BASE_URL}/v1/finance/search`,
        {
            params: {
                q: query,
                quotesCount: 10,
                newsCount: 0
            }
        }
    );

    const quotes = assertArray(
        response.data?.quotes || [],
        "Yahoo Finance returned invalid search data."
    );

    const uniqueSymbols = new Set();
    const quoteCandidates = [
        ...seededQuotes.filter(Boolean),
        ...quotes
    ];

    return quoteCandidates
        .filter((quote) => quote.symbol && (
            quote.quoteType === "EQUITY" ||
            quote.quoteType === "ETF" ||
            quote.typeDisp === "Equity" ||
            quote.typeDisp === "ETF"
        ))
        .filter((quote) => {
            if (uniqueSymbols.has(quote.symbol)) {
                return false;
            }

            uniqueSymbols.add(quote.symbol);
            return true;
        })
        .sort((a, b) => {
            const aIndian = getMarketCountry(a.symbol) === "India" ? 0 : 1;
            const bIndian = getMarketCountry(b.symbol) === "India" ? 0 : 1;

            return aIndian - bIndian;
        })
        .map((quote) => ({
            symbol: quote.symbol,
            name: quote.longname || quote.shortname || quote.symbol,
            exchange: quote.exchDisp || quote.exchange,
            type: quote.typeDisp || quote.quoteType,
            sector: quote.sector || quote.industry,
            country: getMarketCountry(quote.symbol),
            currency: quote.currency || getMarketCurrency(quote.symbol)
        }));
};

export const getCompanyProfileFromYahoo = async (symbol) => {
    const quote = await getYahooSearchQuote(symbol).catch(() => (
        getYahooQuote(symbol)
    ));

    return requireUsableProfile({
        ticker: quote.symbol || symbol,
        name: quote.longname || quote.longName || quote.shortname || quote.shortName,
        exchange: quote.exchDisp || quote.fullExchangeName || quote.exchange,
        country: getMarketCountry(quote.symbol || symbol),
        currency: quote.currency || getMarketCurrency(quote.symbol || symbol),
        marketCapitalization: toNumber(quote.marketCap),
        ipo: "",
        logo: "",
        weburl: "",
        finnhubIndustry: quote.industry || quote.sector || quote.quoteType
    }, "Yahoo Finance");
};

export const getQuoteFromYahoo = async (symbol) => {
    const quote = await getYahooQuote(symbol);

    return requireUsableQuote({
        c: toNumber(quote.regularMarketPrice),
        h: toNumber(quote.regularMarketDayHigh),
        l: toNumber(quote.regularMarketDayLow),
        o: toNumber(quote.regularMarketOpen),
        pc: toNumber(quote.regularMarketPreviousClose),
        d: toNumber(quote.regularMarketChange),
        dp: toNumber(quote.regularMarketChangePercent),
        currency: quote.currency,
        marketState: quote.marketState,
        exchange: quote.fullExchangeName || quote.exchange
    }, "Yahoo Finance");
};

export const getHistoricalDataFromYahoo = async (symbol) => {
    const response = await axiosClient.get(
        `${API_CONFIG.YAHOO_FINANCE_BASE_URL}/v8/finance/chart/${encodeURIComponent(symbol)}`,
        {
            params: {
                range: "1mo",
                interval: "1d"
            }
        }
    );

    const result = response.data?.chart?.result?.[0];
    const timestamps = result?.timestamp || [];
    const quote = result?.indicators?.quote?.[0] || {};
    const rows = timestamps.map((time, index) => ({
        time,
        open: toNumber(quote.open?.[index]),
        high: toNumber(quote.high?.[index]),
        low: toNumber(quote.low?.[index]),
        close: toNumber(quote.close?.[index]),
        volume: toNumber(quote.volume?.[index])
    })).filter((row) => (
        row.open !== null &&
        row.high !== null &&
        row.low !== null &&
        row.close !== null
    ));

    return requireUsableHistoricalData({
        s: "ok",
        t: rows.map((row) => row.time),
        o: rows.map((row) => row.open),
        h: rows.map((row) => row.high),
        l: rows.map((row) => row.low),
        c: rows.map((row) => row.close),
        v: rows.map((row) => row.volume || 0)
    }, "Yahoo Finance");
};
