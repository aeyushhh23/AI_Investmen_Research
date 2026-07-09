import {
    providerCall,
    withFallback
} from "../utils/apiFallback.js";
import { getHistoricalDataFromFinnhub } from "../providers/finnhub.provider.js";
import { getHistoricalDataFromFMP } from "../providers/fmp.provider.js";
import { getHistoricalDataFromAlpha } from "../providers/alpha.provider.js";
import { getHistoricalDataFromTwelveData } from "../providers/twelvedata.provider.js";
import { getHistoricalDataFromYahoo } from "../providers/yahoo.provider.js";

export const getHistoricalData = async (symbol) => withFallback([
    providerCall("Yahoo Finance", () => getHistoricalDataFromYahoo(symbol)),
    providerCall("Finnhub", () => getHistoricalDataFromFinnhub(symbol)),
    providerCall("FMP", () => getHistoricalDataFromFMP(symbol)),
    providerCall("Alpha Vantage", () => getHistoricalDataFromAlpha(symbol)),
    providerCall("Twelve Data", () => getHistoricalDataFromTwelveData(symbol))
]);
