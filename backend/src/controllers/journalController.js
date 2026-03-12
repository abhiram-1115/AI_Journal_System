import Journal from "../models/journal.js";
import { analyzeEmotion } from "../services/llmService.js";
import { generateInsights } from "../utils/insights.js";


// POST /api/journal
export const createJournal = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Request body is required and must be valid JSON." });
    }

    const { text } = req.body;

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Field 'text' is required and must be a non-empty string." });
    }

    // Auto-analyze emotion, keywords, and summary before saving
    const analysis = await analyzeEmotion(text);

    const journal = await Journal.create({
      ...req.body,
      emotion: analysis.emotion,
      keywords: analysis.keywords,
      summary: analysis.summary,
    });

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
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const entries = await Journal.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const totalEntries = entries.length;
    const emotionCount = {};
    const ambienceCount = {};
    const recentKeywords = [];

    for (const e of entries) {
      if (e.emotion) {
        emotionCount[e.emotion] = (emotionCount[e.emotion] || 0) + 1;
      }
      if (e.ambience) {
        ambienceCount[e.ambience] = (ambienceCount[e.ambience] || 0) + 1;
      }

      if (Array.isArray(e.keywords)) {
        for (const k of e.keywords.slice(0, 3)) {
          recentKeywords.push(k);
        }
      }
    }

    const topEmotion =
      Object.entries(emotionCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    const mostUsedAmbience =
      Object.entries(ambienceCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    res.json({
      totalEntries,
      topEmotion,
      mostUsedAmbience,
      recentKeywords: recentKeywords.slice(0, 10),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};