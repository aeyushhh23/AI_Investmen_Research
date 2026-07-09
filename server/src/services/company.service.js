import {
    providerCall,
    withFallback
} from "../utils/apiFallback.js";
import { getCompanyProfileFromFinnhub } from "../providers/finnhub.provider.js";
import { getCompanyProfileFromFMP } from "../providers/fmp.provider.js";
import { getCompanyProfileFromAlpha } from "../providers/alpha.provider.js";
import { getCompanyProfileFromTwelveData } from "../providers/twelvedata.provider.js";
import { getCompanyProfileFromYahoo } from "../providers/yahoo.provider.js";
import {
    getQuote,
    mapQuoteToFinancials
} from "./quote.service.js";
import { getSymbol } from "../utils/symbolResolver.js";

export const getCompanyProfile = async (company) => {

    const symbol = getSymbol(company);

    const profile = await withFallback([
        providerCall("Yahoo Finance", () => getCompanyProfileFromYahoo(symbol)),
        providerCall("Finnhub", () => getCompanyProfileFromFinnhub(symbol)),
        providerCall("FMP", () => getCompanyProfileFromFMP(symbol)),
        providerCall("Alpha Vantage", () => getCompanyProfileFromAlpha(symbol)),
        providerCall("Twelve Data", () => getCompanyProfileFromTwelveData(symbol))
    ]);

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

    const quote = await getQuote(symbol);

    return mapQuoteToFinancials(quote);

};  
