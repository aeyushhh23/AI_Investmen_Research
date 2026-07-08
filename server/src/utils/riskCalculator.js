export const calculateRisk = (financials) => {

    if (financials.percentChange > 5)
        return "High";

    if (financials.percentChange > 2)
        return "Medium";

    return "Low";

};