import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";
import { parseAiJsonResponse } from "../utils/aiResponse.js";
import { ensureApiKey } from "../utils/providerValidation.js";

export const generateInvestmentReportFromOpenRouter = async (prompt) => {
    ensureApiKey(process.env.OPENROUTER_API_KEY, "OpenRouter");

    const response = await axiosClient.post(
        `${API_CONFIG.OPENROUTER_BASE_URL}/chat/completions`,
        {
            model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: {
                type: "json_object"
            }
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
            }
        }
    );

    const text = response.data?.choices?.[0]?.message?.content;

    return parseAiJsonResponse(text, "OpenRouter");
};
