import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeEmotion = async (text) => {

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
Analyze the following journal entry.

Return ONLY valid JSON:

{
 "emotion": "",
 "keywords": [],
 "summary": ""
}

Text: ${text}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();

  } catch (error) {

    console.error("Gemini FULL ERROR:", error);

    throw error;

  }
};