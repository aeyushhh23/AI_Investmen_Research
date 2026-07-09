import { END, START, StateGraph } from "@langchain/langgraph";
import { InvestmentGraphState } from "./graph.state.js";
import { companyNode } from "../nodes/company.node.js";
import { competitorNode } from "../nodes/competitor.node.js";
import { financialNode } from "../nodes/financial.node.js";
import { historyNode } from "../nodes/history.node.js";
import { investmentAnalysisNode } from "../nodes/investment-analysis.node.js";
import { newsNode } from "../nodes/news.node.js";
import { scoresNode } from "../nodes/scores.node.js";
import { workflowFinishedNode } from "../nodes/workflow-finished.node.js";

// LangGraph orchestrates existing backend services here. Nodes keep provider
// fallback and business logic inside the current services layer.
export const investmentGraph = new StateGraph(InvestmentGraphState)
    .addNode("companyNode", companyNode)
    .addNode("financialNode", financialNode)
    .addNode("historyNode", historyNode)
    .addNode("newsNode", newsNode)
    .addNode("competitorNode", competitorNode)
    .addNode("scoresNode", scoresNode)
    .addNode("investmentAnalysisNode", investmentAnalysisNode)
    .addNode("workflowFinishedNode", workflowFinishedNode)
    .addEdge(START, "companyNode")
    .addEdge("companyNode", "financialNode")
    .addEdge("companyNode", "historyNode")
    .addEdge("companyNode", "newsNode")
    .addEdge("companyNode", "competitorNode")
    .addEdge(
        ["financialNode", "historyNode", "newsNode", "competitorNode"],
        "scoresNode"
    )
    .addEdge("scoresNode", "investmentAnalysisNode")
    .addEdge("investmentAnalysisNode", "workflowFinishedNode")
    .addEdge("workflowFinishedNode", END)
    .compile();
