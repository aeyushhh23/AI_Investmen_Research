export const ensureApiKey = (key, providerName) => {
    if (!key) {
        throw new Error(`${providerName} API key is not configured.`);
    }
};

export const assertObject = (value, message = "Invalid provider response") => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error(message);
    }

    return value;
};

export const assertArray = (value, message = "Invalid provider response") => {
    if (!Array.isArray(value)) {
        throw new Error(message);
    }

    return value;
};

export const assertNonEmptyArray = (
    value,
    message = "Provider returned no data"
) => {
    assertArray(value, message);

    if (value.length === 0) {
        throw new Error(message);
    }

    return value;
};

export const hasNumber = (value) => (
    typeof value === "number" && Number.isFinite(value)
);

export const toNumber = (value) => {
    const number = Number(value);

    return Number.isFinite(number) ? number : null;
};

export const requireUsableQuote = (quote, providerName) => {
    assertObject(quote, `${providerName} returned invalid quote data.`);

    if (!hasNumber(quote.c)) {
        throw new Error(`${providerName} returned invalid quote price.`);
    }

    return quote;
};

export const requireUsableProfile = (profile, providerName) => {
    assertObject(profile, `${providerName} returned invalid profile data.`);

    if (!profile.ticker || !profile.name) {
        throw new Error(`${providerName} returned incomplete profile data.`);
    }

    return profile;
};

export const requireUsableHistoricalData = (data, providerName) => {
    assertObject(data, `${providerName} returned invalid historical data.`);

    if (data.s !== "ok" || !Array.isArray(data.t) || data.t.length === 0) {
        throw new Error(`${providerName} returned no historical data.`);
    }

    return data;
};
