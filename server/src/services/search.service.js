import { searchCompaniesFromYahoo } from "../providers/yahoo.provider.js";

export const searchCompanies = async (query) => {
    const term = query?.trim();

    if (!term || term.length < 1) {
        return [];
    }

    return searchCompaniesFromYahoo(term);
};
