import { analyzeCompetitors } from "../services/competitor.service.js";
import { serializeNodeError } from "./node.utils.js";

export const competitorNode = async (state) => {
    try {
        const competitors = await analyzeCompetitors(state.symbol);

        console.log("Competitor Node Completed");

        return {
            competitors
        };
    } catch (error) {
        console.warn("Competitor Node Failed:", error.message);

        return {
            competitors: [],
            errors: [serializeNodeError("competitor", error)]
        };
    }
};
