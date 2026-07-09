const COMPANY_SYMBOLS = {
    tesla: "TSLA",
    ford: "F",
    rivian: "RIVN",
    lucid: "LCID",

    apple: "AAPL",
    microsoft: "MSFT",
    google: "GOOGL",
    alphabet: "GOOGL",

    amazon: "AMZN",
    meta: "META",
    netflix: "NFLX",

    nvidia: "NVDA",
    amd: "AMD",
    intel: "INTC",
    qualcomm: "QCOM",

    oracle: "ORCL",
    walmart: "WMT",
    shopify: "SHOP",

    alibaba: "BABA",

    byd: "BYDDY",
    gm: "GM",
    "general motors": "GM",

    reliance: "RELIANCE.NS",
    "reliance industries": "RELIANCE.NS",
    tcs: "TCS.NS",
    "tata consultancy services": "TCS.NS",
    infosys: "INFY.NS",
    hdfc: "HDFCBANK.NS",
    "hdfc bank": "HDFCBANK.NS",
    icici: "ICICIBANK.NS",
    "icici bank": "ICICIBANK.NS",
    sbi: "SBIN.NS",
    "state bank of india": "SBIN.NS",
    airtel: "BHARTIARTL.NS",
    "bharti airtel": "BHARTIARTL.NS",
    itc: "ITC.NS",
    "larsen and toubro": "LT.NS",
    "l&t": "LT.NS",
    "tata motors": "TATAMOTORS.NS",
    maruti: "MARUTI.NS",
    "maruti suzuki": "MARUTI.NS",
    "axis bank": "AXISBANK.NS",
    "kotak bank": "KOTAKBANK.NS",
    wipro: "WIPRO.NS",
    "hcl tech": "HCLTECH.NS",
    hcltech: "HCLTECH.NS",
    "adani enterprises": "ADANIENT.NS",
    "sun pharma": "SUNPHARMA.NS",
    "asian paints": "ASIANPAINT.NS",
    titan: "TITAN.NS",
    "bajaj finance": "BAJFINANCE.NS",
    ntpc: "NTPC.NS",
    ongc: "ONGC.NS"
};

const EXCHANGE_SUFFIXES = {
    NSE: ".NS",
    NS: ".NS",
    BSE: ".BO",
    BO: ".BO"
};

const getInitials = (value) => value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("");

export const isIndianSymbol = (symbol) => /\.(NS|BO)$/i.test(symbol);

export const getMarketCountry = (symbol) => (
    isIndianSymbol(symbol) ? "India" : undefined
);

export const getMarketCurrency = (symbol) => (
    isIndianSymbol(symbol) ? "INR" : undefined
);

export const getKnownSymbolMatches = (query, limit = 5) => {
    const term = query?.trim().toLowerCase();

    if (!term) {
        return [];
    }

    const symbols = [];
    const seen = new Set();

    for (const [alias, symbol] of Object.entries(COMPANY_SYMBOLS)) {
        const normalizedSymbol = symbol.toLowerCase();
        const baseSymbol = normalizedSymbol.split(".")[0];
        const aliasInitials = getInitials(alias);

        if (
            alias.startsWith(term) ||
            baseSymbol.startsWith(term) ||
            aliasInitials.startsWith(term)
        ) {
            if (!seen.has(symbol)) {
                seen.add(symbol);
                symbols.push(symbol);
            }
        }

        if (symbols.length >= limit) {
            break;
        }
    }

    return symbols;
};

export const getSymbol = (company) => {
    if (!company) {
        throw new Error("Company name is required.");
    }

    const input = company.trim();
    const lowerInput = input.toLowerCase();
    const mappedSymbol = COMPANY_SYMBOLS[lowerInput];

    if (mappedSymbol) {
        return mappedSymbol;
    }

    const upperInput = input.toUpperCase();

    const prefixedExchange = upperInput.match(/^(NSE|BSE):([A-Z0-9&-]{1,20})$/);
    if (prefixedExchange) {
        return `${prefixedExchange[2]}${EXCHANGE_SUFFIXES[prefixedExchange[1]]}`;
    }

    const suffixedExchange = upperInput.match(/^([A-Z0-9&-]{1,20})[.:](NSE|BSE|NS|BO)$/);
    if (suffixedExchange) {
        return `${suffixedExchange[1]}${EXCHANGE_SUFFIXES[suffixedExchange[2]]}`;
    }

    if (/^[A-Z0-9&-]{1,20}\.(NS|BO)$/.test(upperInput)) {
        return upperInput;
    }

    if (/^[A-Z]{1,5}$/.test(upperInput)) {
        return upperInput;
    }

    if (/^[A-Z0-9&-]{1,20}$/.test(upperInput)) {
        return `${upperInput}.NS`;
    }

    throw new Error(
        `Company '${company}' is not supported. Try a ticker such as RELIANCE.NS, TCS.NS, NSE:INFY, 500325.BO, AAPL, or MSFT.`
    );
};
