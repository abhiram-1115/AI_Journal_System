import express from "express";
import {
createJournal,
getJournals,
analyzeJournal,
getInsights
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/", createJournal);

router.post("/analyze", analyzeJournal);

router.get("/insights/:userId", getInsights);

router.get("/:userId", getJournals);

export default router;