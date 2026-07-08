import express from "express";

import { analyzeCompany } from "../controllers/analysis.controller.js";

const router = express.Router();

router.post("/analyze", analyzeCompany);

export default router;