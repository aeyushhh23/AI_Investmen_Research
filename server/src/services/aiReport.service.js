import { buildInvestmentPrompt } from "../prompts/investment.prompt.js";
import { investmentReportParser } from "../chains/investment.chain.js";
import {
    providerCall,
    withFallback
} from "../utils/apiFallback.js";
import {
    defaultAiReport,
    normalizeAiReport
} from "../utils/aiResponse.js";
import { generateInvestmentReportFromGemini } from "../providers/gemini.provider.js";
import { generateInvestmentReportFromOpenRouter } from "../providers/openrouter.provider.js";
import { generateInvestmentReportFromGroq } from "../providers/groq.provider.js";

export const generateInvestmentReport = async (analysis) => {
    const prompt = await buildInvestmentPrompt(
        analysis,
        investmentReportParser.getFormatInstructions()
    );

    try {
        const report = await withFallback([
            providerCall(
                "Gemini",
                () => generateInvestmentReportFromGemini(analysis)
            ),
            providerCall(
                "OpenRouter",
                () => generateInvestmentReportFromOpenRouter(prompt)
            ),
            providerCall(
                "Groq",
                () => generateInvestmentReportFromGroq(prompt)
            )
        ]);

        return normalizeAiReport(report);
    } catch (error) {
        console.error("AI Report Error:", error.message);

        return defaultAiReport();
    }
};
