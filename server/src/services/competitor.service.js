import {
    getCompanyProfile,
    getCompanyQuote
} from "./company.service.js";

const competitorMap = {

    TSLA: ["BYDDY", "RIVN", "LCID", "F", "GM"],

    AAPL: ["MSFT", "GOOGL", "AMZN", "META"],

    MSFT: ["AAPL", "GOOGL", "AMZN", "ORCL"],

    GOOGL: ["MSFT", "AAPL", "META", "AMZN"],

    AMZN: ["WMT", "SHOP", "BABA", "EBAY"],

    META: ["GOOGL", "SNAP", "PINS", "RDDT"],

    NVDA: ["AMD", "INTC", "QCOM", "TSM"],

    AMD: ["NVDA", "INTC", "QCOM", "TSM"],

    INTC: ["AMD", "NVDA", "QCOM", "TSM"],

    NFLX: ["DIS", "WBD", "PARA", "AMZN"]

};

export const analyzeCompetitors = async (symbol) => {

    const competitors = competitorMap[symbol] || [];

    const results = [];

    for (const ticker of competitors) {

        try {

            const profile = await getCompanyProfile(ticker);

            const quote = await getCompanyQuote(ticker);

            results.push({

                symbol: profile.symbol,
                name: profile.companyName,
                industry: profile.industry,
                currentPrice: quote.currentPrice,
                change: quote.percentChange

            });

        } catch (error) {

            console.log(`Skipping ${ticker}: ${error.message}`);

        }

    }

    return results;

};