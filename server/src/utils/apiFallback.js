const getProviderName = (providerFn) => {
    if (providerFn.providerName) {
        return providerFn.providerName;
    }

    const match = providerFn.name?.match(/From([A-Za-z0-9]+)$/);

    return match?.[1] || providerFn.name || "Provider";
};

export const providerCall = (providerName, fn) => {
    const call = async () => fn();
    call.providerName = providerName;
    return call;
};

export const withFallback = async (providerFns) => {
    if (!Array.isArray(providerFns) || providerFns.length === 0) {
        throw new Error("No providers configured.");
    }

    const failures = [];

    for (const providerFn of providerFns) {
        const providerName = getProviderName(providerFn);

        if (failures.length > 0) {
            console.log(`Trying ${providerName}...`);
        }

        try {
            const result = await providerFn();

            if (result === null || result === undefined) {
                throw new Error("Invalid empty response");
            }

            console.log(`✔ ${providerName} Success`);

            return result;
        } catch (error) {
            failures.push({
                provider: providerName,
                message: error.response?.data?.message || error.message
            });

            console.warn(`✖ ${providerName} Failed`);
        }
    }

    console.error("All providers failed:", failures);

    throw new Error("Unable to fetch data from available providers.");
};
