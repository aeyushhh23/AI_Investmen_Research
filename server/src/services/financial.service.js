import { getFinancialMetricsFromFinnhub } from "../providers/financial.provider.js";

export const getFinancialData = async (symbol) => {

    const financial = await getFinancialMetricsFromFinnhub(symbol);

    return {

        currentPrice: financial.c,

        highPrice: financial.h,

        lowPrice: financial.l,

        openPrice: financial.o,

        previousClose: financial.pc,

        change: financial.d,

        percentChange: financial.dp

    };

};