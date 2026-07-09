import { getCompanyNewsFromFinnhub } from "../providers/finnhub.provider.js";
import { getCompanyNewsFromNewsAPI } from "../providers/newsapi.provider.js";
import { getCompanyNewsFromMarketaux } from "../providers/marketaux.provider.js";
import {
    providerCall,
    withFallback
} from "../utils/apiFallback.js";

export const getNews = async (symbol) => {

    try {

        const articles = await withFallback([
            providerCall("Finnhub", () => getCompanyNewsFromFinnhub(symbol)),
            providerCall("Marketaux", () => getCompanyNewsFromMarketaux(symbol)),
            providerCall("NewsAPI", () => getCompanyNewsFromNewsAPI(symbol))
        ]);

        return articles.slice(0, 10).map(article => ({

            title: article.headline,

            description: article.summary,

            source: article.source,

            publishedAt: article.datetime,

            url: article.url,

            image: article.image

        }));

    } catch(error) {

        console.error("News Error:", error.message);

        return [];

    }

};
