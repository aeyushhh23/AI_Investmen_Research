export const getDemoUser = () => ({
    id: "demo-user",
    name: process.env.DEMO_USER_NAME || "Demo Analyst",
    email: process.env.DEMO_USER_EMAIL || "demo@ai-investment.local",
    avatar: "",
    authProvider: "demo",
});
