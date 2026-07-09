import express from "express";
import { searchCompanySuggestions } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", searchCompanySuggestions);

export default router;
