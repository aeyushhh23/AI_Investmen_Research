import { getCompanyProfile } from "./company.service.js";
import { getFinancialData } from "./financial.service.js";
import { getHistoricalData } from "./historical.service.js";
import { getNews } from "./news.service.js";

import { calculateInvestmentScore } from "../utils/scoreCalculator.js";
import { calculateNewsSentiment } from "../utils/sentimentCalculator.js";
import { calculateRisk } from "../utils/riskCalculator.js";

import { generateInvestmentReport } from "./aiReport.service.js";

export const analyzeInvestment = async (company) => {

    const profile =
        await getCompanyProfile(company);

    const quoteFinancials =
        await getFinancialData(profile.symbol);

    const financials = {
        ...quoteFinancials,
        currency: quoteFinancials.currency || profile.currency || "USD"
    };

    const historical =
        await getHistoricalData(profile.symbol).catch((error) => {
            console.warn("Historical Data Error:", error.message);
            return null;
        });

    const news =
        await getNews(profile.symbol);

    const investmentScore =
        calculateInvestmentScore(financials);

    const newsSentiment =
        calculateNewsSentiment(news);

    const risk =
        calculateRisk(financials);

    const analysis = {

        company: profile,

        financials,

        historical,

        news,

        scores: {

            investmentScore,

            newsSentiment,

            risk

        }

    };

    const aiReport =
        await generateInvestmentReport(
            analysis
        );

    return {

        ...analysis,

        aiReport

    };

};
