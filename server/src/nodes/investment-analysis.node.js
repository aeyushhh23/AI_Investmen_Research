import { generateInvestmentReport } from "../services/aiReport.service.js";
import { defaultAiReport } from "../utils/aiResponse.js";
import { serializeNodeError } from "./node.utils.js";

export const investmentAnalysisNode = async (state) => {
    try {
        const analysis = {
            company: state.company,
            financials: state.financials,
            historical: state.history,
            history: state.history,
            news: state.news || [],
            competitors: state.competitors || [],
            scores: state.scores
        };

        const aiReport = await generateInvestmentReport(analysis);

        console.log("Investment AI Completed");

        return {
            aiReport
        };
    } catch (error) {
        console.error("Investment AI Failed:", error.message);

        return {
            aiReport: defaultAiReport(),
            errors: [serializeNodeError("investmentAnalysis", error)]
        };
    }
};
