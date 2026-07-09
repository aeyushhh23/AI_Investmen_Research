import { ChatPromptTemplate } from "@langchain/core/prompts";

export const investmentPrompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        [
            "You are a senior investment research analyst.",
            "Use the supplied company, market, news, competitor, and scoring data.",
            "Return only JSON that follows the parser instructions exactly.",
            "Do not include markdown fences or prose outside the JSON."
        ].join(" ")
    ],
    [
        "human",
        [
            "Generate an investment report with:",
            "- Executive Summary",
            "- Investment Recommendation",
            "- Investment Score",
            "- Risk Level",
            "- Strengths",
            "- Weaknesses",
            "- Opportunities",
            "- Threats",
            "- Future Outlook",
            "",
            "Company:",
            "{company}",
            "",
            "Financials:",
            "{financials}",
            "",
            "Historical Data:",
            "{historical}",
            "",
            "News:",
            "{news}",
            "",
            "Competitors:",
            "{competitors}",
            "",
            "Scores:",
            "{scores}",
            "",
            "Parser instructions:",
            "{formatInstructions}"
        ].join("\n")
    ]
]);

export const buildInvestmentPrompt = async (analysis, formatInstructions = "") => (
    investmentPrompt.format({
        company: JSON.stringify(analysis.company || {}),
        financials: JSON.stringify(analysis.financials || {}),
        historical: JSON.stringify(analysis.historical || analysis.history || {}),
        news: JSON.stringify(analysis.news || []),
        competitors: JSON.stringify(analysis.competitors || []),
        scores: JSON.stringify(analysis.scores || {}),
        formatInstructions
    })
);
