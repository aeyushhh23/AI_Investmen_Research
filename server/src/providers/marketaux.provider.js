import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";
import {
    assertNonEmptyArray,
    ensureApiKey
} from "../utils/providerValidation.js";
import { mapNewsArticle } from "../utils/providerMappers.js";

export const getCompanyNewsFromMarketaux = async (symbol) => {
    ensureApiKey(process.env.MARKETAUX_API_KEY, "Marketaux");

    const response = await axiosClient.get(
        `${API_CONFIG.MARKETAUX_BASE_URL}/news/all`,
        {
            params: {
                symbols: symbol,
                language: "en",
                limit: 10,
                api_token: process.env.MARKETAUX_API_KEY
            }
        }
    );

    const articles = assertNonEmptyArray(
        response.data?.data,
        "Marketaux returned no articles."
    );

    return articles.map((article) => mapNewsArticle({
        title: article.title,
        description: article.description,
        source: article.source,
        publishedAt: article.published_at,
        url: article.url,
        image: article.image_url
    }));
};
