import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";
import { parseAiJsonResponse } from "../utils/aiResponse.js";
import { ensureApiKey } from "../utils/providerValidation.js";

export const generateInvestmentReportFromGroq = async (prompt) => {
    ensureApiKey(process.env.GROQ_API_KEY, "Groq");

    const response = await axiosClient.post(
        `${API_CONFIG.GROQ_BASE_URL}/chat/completions`,
        {
            model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
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
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`
            }
        }
    );

    const text = response.data?.choices?.[0]?.message?.content;

    return parseAiJsonResponse(text, "Groq");
};
