export const API_CONFIG = {
    REQUEST_TIMEOUT_MS: Number(process.env.API_REQUEST_TIMEOUT_MS || 10000),
    REQUEST_RETRIES: Number(process.env.API_REQUEST_RETRIES || 2),

    FINNHUB_BASE_URL: "https://finnhub.io/api/v1",
    FMP_BASE_URL: "https://financialmodelingprep.com/api",
    ALPHA_VANTAGE_BASE_URL: "https://www.alphavantage.co/query",
    TWELVE_DATA_BASE_URL: "https://api.twelvedata.com",
    YAHOO_FINANCE_BASE_URL: "https://query1.finance.yahoo.com",
    NEWS_API_BASE_URL: "https://newsapi.org/v2",
    MARKETAUX_BASE_URL: "https://api.marketaux.com/v1",
    GEMINI_BASE_URL: "https://generativelanguage.googleapis.com/v1beta",
    OPENROUTER_BASE_URL: "https://openrouter.ai/api/v1",
    GROQ_BASE_URL: "https://api.groq.com/openai/v1"
};
