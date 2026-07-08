import {
    getCompanyProfileFromFinnhub,
    getCompanyQuoteFromFinnhub
} from "../providers/finnhub.provider.js";

const COMPANY_SYMBOLS = {

    tesla: "TSLA",
    ford: "F",
    rivian: "RIVN",
    lucid: "LCID",

    apple: "AAPL",
    microsoft: "MSFT",
    google: "GOOGL",
    alphabet: "GOOGL",

    amazon: "AMZN",
    meta: "META",
    netflix: "NFLX",

    nvidia: "NVDA",
    amd: "AMD",
    intel: "INTC",
    qualcomm: "QCOM",

    oracle: "ORCL",
    walmart: "WMT",
    shopify: "SHOP",

    alibaba: "BABA",

    byd: "BYDDY",
    gm: "GM",
    "general motors": "GM"
};

const getSymbol = (company) => {

    if (!company) {

        throw new Error("Company name is required.");

    }

    const input = company.trim();

    if (/^[A-Za-z]{1,5}$/.test(input)) {

        return input.toUpperCase();

    }

    const symbol = COMPANY_SYMBOLS[input.toLowerCase()];

    if (!symbol) {

        throw new Error(`Company '${company}' is not supported.`);

    }

    return symbol;

};

export const getCompanyProfile = async (company) => {

    const symbol = getSymbol(company);

    const profile = await getCompanyProfileFromFinnhub(symbol);

    return {

        symbol: profile.ticker,
        companyName: profile.name,
        exchange: profile.exchange,
        country: profile.country,
        currency: profile.currency,
        marketCapitalization: profile.marketCapitalization,
        ipo: profile.ipo,
        logo: profile.logo,
        weburl: profile.weburl,
        industry: profile.finnhubIndustry

    };

};

export const getCompanyQuote = async (company) => {

    const symbol = getSymbol(company);

    const quote = await getCompanyQuoteFromFinnhub(symbol);

    return {

        currentPrice: quote.c,
        highPrice: quote.h,
        lowPrice: quote.l,
        openPrice: quote.o,
        previousClose: quote.pc,
        change: quote.d,
        percentChange: quote.dp

    };

};  