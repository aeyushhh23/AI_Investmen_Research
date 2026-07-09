import { getNews } from "../services/news.service.js";
import { serializeNodeError } from "./node.utils.js";

export const newsNode = async (state) => {
    try {
        const news = await getNews(state.symbol);

        console.log("News Node Completed");

        return {
            news
        };
    } catch (error) {
        console.warn("News Node Failed:", error.message);

        return {
            news: [],
            errors: [serializeNodeError("news", error)]
        };
    }
};
