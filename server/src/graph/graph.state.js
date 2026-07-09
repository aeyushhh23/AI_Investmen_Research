import { Annotation } from "@langchain/langgraph";

export const InvestmentGraphState = Annotation.Root({
    symbol: Annotation(),
    company: Annotation(),
    financials: Annotation(),
    history: Annotation(),
    historical: Annotation(),
    news: Annotation({
        default: () => []
    }),
    competitors: Annotation({
        default: () => []
    }),
    scores: Annotation(),
    aiReport: Annotation(),
    errors: Annotation({
        reducer: (current, update) => [
            ...(current || []),
            ...(Array.isArray(update) ? update : [])
        ],
        default: () => []
    })
});
