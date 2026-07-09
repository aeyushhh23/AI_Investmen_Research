import axios from "axios";
import { API_CONFIG } from "../config/api.config.js";

const axiosClient = axios.create({

    timeout: API_CONFIG.REQUEST_TIMEOUT_MS,

    headers: {

        "Content-Type": "application/json"

    }

});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetry = (error) => {
    const status = error.response?.status;

    return (
        !status ||
        status === 408 ||
        status === 429 ||
        status >= 500 ||
        error.code === "ECONNABORTED"
    );
};

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config || {};
        config.__retryCount = config.__retryCount || 0;

        if (
            config.__retryCount < API_CONFIG.REQUEST_RETRIES &&
            shouldRetry(error)
        ) {
            config.__retryCount += 1;

            await wait(300 * config.__retryCount);

            return axiosClient(config);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
