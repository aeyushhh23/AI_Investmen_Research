export const defaultAiReport = () => ({
    summary: "Unable to generate AI report.",
    executiveSummary: "Unable to generate AI report.",
    valuation: "",
    futureOutlook: "",
    strengths: [],
    weaknesses: [],
    opportunities: [],
    risks: [],
    recommendation: "HOLD",
    investmentScore: 50,
    risk: "Medium",
    confidence: 0,
    swot: {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: []
    }
});

export const normalizeAiReport = (report = {}) => {
    const swot = {
        strengths: report.swot?.strengths || report.strengths || [],
        weaknesses: report.swot?.weaknesses || report.weaknesses || [],
        opportunities: report.swot?.opportunities || report.opportunities || [],
        threats: report.swot?.threats || report.threats || report.risks || []
    };

    const summary = report.summary || report.executiveSummary || "";
    const futureOutlook = report.futureOutlook || report.outlook || "";
    const risks = Array.isArray(report.risks)
        ? report.risks.join("\n")
        : report.risks || swot.threats.join("\n") || report.risk || "";

    return {
        summary,
        recommendation: report.recommendation || "HOLD",
        investmentScore: report.investmentScore ?? report.score ?? 50,
        risk: report.risk || report.riskLevel || "Medium",
        valuation: report.valuation || futureOutlook,
        futureOutlook,
        risks,
        swot
    };
};

export const parseAiJsonResponse = (text, providerName) => {
    if (!text || typeof text !== "string") {
        throw new Error(`${providerName} returned empty AI content.`);
    }

    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const parsed = JSON.parse(cleaned);

    if (!parsed || typeof parsed !== "object") {
        throw new Error(`${providerName} returned invalid AI report.`);
    }

    return normalizeAiReport(parsed);
};
