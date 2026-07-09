import { calculateInvestmentScore } from "../utils/scoreCalculator.js";
import { calculateNewsSentiment } from "../utils/sentimentCalculator.js";
import { calculateRisk } from "../utils/riskCalculator.js";
import { serializeNodeError } from "./node.utils.js";

export const scoresNode = async (state) => {
    try {
        const investmentScore = calculateInvestmentScore(state.financials);
        const risk = calculateRisk(state.financials);
        const recommendation =
            investmentScore >= 70 && risk !== "High"
                ? "BUY"
                : investmentScore <= 40 || risk === "High"
                ? "SELL"
                : "HOLD";

        return {
            scores: {
                investmentScore,
                newsSentiment: calculateNewsSentiment(state.news || []),
                risk,
                recommendation
            }
        };
    } catch (error) {
        console.warn("Scores Node Failed:", error.message);

        return {
            scores: {
                investmentScore: 50,
                newsSentiment: 50,
                risk: "Medium",
                recommendation: "HOLD"
            },
            errors: [serializeNodeError("scores", error)]
        };
    }
};
