import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import { investmentPrompt } from "../prompts/investment.prompt.js";
import { ensureApiKey } from "../utils/providerValidation.js";

const investmentReportSchema = z.object({
    summary: z.string(),
    recommendation: z.enum(["BUY", "HOLD", "SELL"]),
    investmentScore: z.number().min(0).max(100),
    risk: z.string(),
    valuation: z.string().optional(),
    futureOutlook: z.string().optional(),
    swot: z.object({
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        opportunities: z.array(z.string()),
        threats: z.array(z.string())
    })
});

export const investmentReportParser =
    StructuredOutputParser.fromZodSchema(investmentReportSchema);

export const generateGeminiInvestmentReport = async (analysis) => {
    ensureApiKey(process.env.GEMINI_API_KEY, "Gemini");

    const model = new ChatGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY,
        model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
        temperature: 0.2
    });

    const chain = investmentPrompt
        .pipe(model)
        .pipe(investmentReportParser);

    const result = await chain.invoke({
        company: JSON.stringify(analysis.company || {}),
        financials: JSON.stringify(analysis.financials || {}),
        historical: JSON.stringify(analysis.historical || analysis.history || {}),
        news: JSON.stringify(analysis.news || []),
        competitors: JSON.stringify(analysis.competitors || []),
        scores: JSON.stringify(analysis.scores || {}),
        formatInstructions: investmentReportParser.getFormatInstructions()
    });

    return {
        summary: result.summary,
        recommendation: result.recommendation,
        investmentScore: result.investmentScore,
        risk: result.risk,
        valuation: result.valuation || result.futureOutlook || "",
        futureOutlook: result.futureOutlook || "",
        risks: result.swot?.threats?.join("\n") || result.risk,
        swot: result.swot
    };
};
