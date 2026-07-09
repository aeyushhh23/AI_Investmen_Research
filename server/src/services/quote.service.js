import {
    providerCall,
    withFallback
} from "../utils/apiFallback.js";
import { getQuoteFromFinnhub } from "../providers/finnhub.provider.js";
import { getQuoteFromFMP } from "../providers/fmp.provider.js";
import { getQuoteFromAlpha } from "../providers/alpha.provider.js";
import { getQuoteFromTwelveData } from "../providers/twelvedata.provider.js";
import { getQuoteFromYahoo } from "../providers/yahoo.provider.js";

export const getQuote = async (symbol) => withFallback([
    providerCall("Yahoo Finance", () => getQuoteFromYahoo(symbol)),
    providerCall("Finnhub", () => getQuoteFromFinnhub(symbol)),
    providerCall("FMP", () => getQuoteFromFMP(symbol)),
    providerCall("Alpha Vantage", () => getQuoteFromAlpha(symbol)),
    providerCall("Twelve Data", () => getQuoteFromTwelveData(symbol))
]);

export const mapQuoteToFinancials = (quote) => ({
    currentPrice: quote.c,
    highPrice: quote.h,
    lowPrice: quote.l,
    openPrice: quote.o,
    previousClose: quote.pc,
    change: quote.d,
    percentChange: quote.dp,
    currency: quote.currency,
    marketState: quote.marketState,
    exchange: quote.exchange
});
