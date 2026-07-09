import { getHistoricalData } from "../services/historical.service.js";
import { serializeNodeError } from "./node.utils.js";

export const historyNode = async (state) => {
    try {
        const history = await getHistoricalData(state.symbol);

        console.log("Historical Data Node Completed");

        return {
            history,
            historical: history
        };
    } catch (error) {
        console.warn("Historical Data Node Failed:", error.message);

        return {
            history: null,
            historical: null,
            errors: [serializeNodeError("history", error)]
        };
    }
};
