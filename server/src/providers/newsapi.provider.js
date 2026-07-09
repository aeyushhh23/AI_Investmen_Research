import axiosClient from "../utils/axiosClient.js";
import { API_CONFIG } from "../config/api.config.js";
import {
    assertNonEmptyArray,
    ensureApiKey
} from "../utils/providerValidation.js";
import { mapNewsArticle } from "../utils/providerMappers.js";

export const getCompanyNewsFromNewsAPI = async (symbol) => {
    ensureApiKey(process.env.NEWS_API_KEY, "NewsAPI");

    const response = await axiosClient.get(
        `${API_CONFIG.NEWS_API_BASE_URL}/everything`,
        {
            params: {
                q: `${symbol} stock OR ${symbol} earnings`,
                language: "en",
                sortBy: "publishedAt",
                pageSize: 10,
                apiKey: process.env.NEWS_API_KEY
            }
        }
    );

    const articles = assertNonEmptyArray(
        response.data?.articles,
        "NewsAPI returned no articles."
    );

    return articles.map((article) => mapNewsArticle({
        title: article.title,
        description: article.description,
        source: article.source?.name,
        publishedAt: article.publishedAt,
        url: article.url,
        image: article.urlToImage
    }));
};
