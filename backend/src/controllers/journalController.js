import Journal from "../models/journal.js";
import { analyzeEmotion } from "../services/llmService.js";
import { generateInsights } from "../utils/insights.js";


// POST /api/journal
export const createJournal = async (req, res) => {

try {

if (!req.body || typeof req.body !== "object") {
return res.status(400).json({ error: "Request body is required and must be valid JSON." });
}

const journal = await Journal.create(req.body);

res.status(201).json(journal);

} catch (error) {

res.status(500).json({ error: error.message });

}

};



// GET /api/journal/:userId
export const getJournals = async (req, res) => {

try {

const journals = await Journal.find({
userId: req.params.userId
}).sort({ createdAt: -1 });

res.json(journals);

} catch (error) {

res.status(500).json({ error: error.message });

}

};



// POST /api/journal/analyze
export const analyzeJournal = async (req, res) => {

try {

const { text } = req.body || {};

if (typeof text !== "string" || !text.trim()) {
return res.status(400).json({ error: "Field 'text' is required and must be a non-empty string." });
}

const result = await analyzeEmotion(text);

res.json(result);

} catch (error) {

res.status(500).json({ error: error.message });

}

};



// GET /api/journal/insights/:userId
export const getInsights = async (req, res) => {

try {

const entries = await Journal.find({
userId: req.params.userId
});

const insights = generateInsights(entries);

res.json(insights);

} catch (error) {

res.status(500).json({ error: error.message });

}

};