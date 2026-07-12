import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import chartRoutes from "./src/routes/chart.routes.js";
import analysisRoutes from "./src/routes/analysis.routes.js";
import searchRoutes from "./src/routes/search.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Investment Research API Running"
    });
});

app.use("/api", analysisRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chart", chartRoutes);
app.use("/api/search", searchRoutes);
export default app;
