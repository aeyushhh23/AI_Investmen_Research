export const serializeNodeError = (node, error) => ({
    node,
    message: error.message,
    status: error.response?.status,
    providerMessage: error.response?.data?.message
});
