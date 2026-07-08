import axios from "axios";

export const getHistoricalData = async (symbol) => {

    const API_KEY = process.env.FINNHUB_API_KEY;

    console.log("API KEY:", API_KEY);

    const to = Math.floor(Date.now() / 1000);
    const from = to - (30 * 24 * 60 * 60);

    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${API_KEY}`;

    console.log("REQUEST URL:", url);

    const { data } = await axios.get(url);

    if (data.s !== "ok") {
        throw new Error("Historical data not found");
    }

    return data;
};