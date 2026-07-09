import { getFinancialData } from "../services/financial.service.js";
import { serializeNodeError } from "./node.utils.js";

export const financialNode = async (state) => {
    try {
        const quoteFinancials = await getFinancialData(state.symbol);
        const financials = {
            ...quoteFinancials,
            currency: quoteFinancials.currency || state.company?.currency || "USD"
        };

        console.log("Financial Node Completed");

        return {
            financials
        };
    } catch (error) {
        console.error("Financial Node Failed:", error.message);

        error.graphErrors = [serializeNodeError("financial", error)];
        throw error;
    }
};
