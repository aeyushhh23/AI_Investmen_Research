import express from "express";
import {
    demoLogin,
    me,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/demo", demoLogin);
router.get("/me", requireAuth, me);

export default router;
