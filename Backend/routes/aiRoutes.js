import express from "express";
import { askAI, savePrompt } from "../controllers/aiController.js";

const router = express.Router();

router.post("/askAi", askAI);
router.post("/savePrompt", savePrompt);

export default router;