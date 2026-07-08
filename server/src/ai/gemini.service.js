import axios from "axios";

import { buildInvestmentPrompt } from "../prompts/investment.prompt.js";

export const generateInvestmentReport = async (analysis) => {

    const prompt = buildInvestmentPrompt(analysis);

    try {

        const response = await axios.post(

            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

            {

                contents: [

                    {

                        parts: [

                            {

                                text: prompt

                            }

                        ]

                    }

                ]

            }

        );

        const text =
            response.data
            .candidates[0]
            .content
            .parts[0]
            .text;

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleaned);

    }

    catch(error){

        console.error(
            "Gemini Error:",
            error.response?.data || error.message
        );

        return {

            executiveSummary:
                "Unable to generate AI report.",

            strengths:[],

            weaknesses:[],

            opportunities:[],

            risks:[],

            recommendation:"HOLD",

            confidence:0

        };

    }

};