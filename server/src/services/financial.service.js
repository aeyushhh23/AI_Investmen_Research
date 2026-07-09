import {
    getQuote,
    mapQuoteToFinancials
} from "./quote.service.js";

export const getFinancialData = async (symbol) => {

    const financial = await getQuote(symbol);

    return mapQuoteToFinancials(financial);

};
