import { getCompanyNewsFromFinnhub } from "../providers/finnhub.provider.js";

export const getNews = async (symbol) => {

    try {

        const articles = await getCompanyNewsFromFinnhub(symbol);

        return articles.slice(0, 10).map(article => ({

            title: article.headline,

            description: article.summary,

            source: article.source,

            publishedAt: article.datetime,

            url: article.url,

            image: article.image

        }));

    }

    catch(error){

        console.error("News Error:", error.message);

        return [];

    }

};