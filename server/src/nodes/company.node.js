import { getCompanyProfile } from "../services/company.service.js";
import { serializeNodeError } from "./node.utils.js";

export const companyNode = async (state) => {
    console.log("Starting Company Node");

    try {
        const company = await getCompanyProfile(state.symbol);

        console.log("Company Node Completed");

        return {
            company,
            symbol: company.symbol || state.symbol
        };
    } catch (error) {
        console.error("Company Node Failed:", error.message);

        error.graphErrors = [serializeNodeError("company", error)];
        throw error;
    }
};
