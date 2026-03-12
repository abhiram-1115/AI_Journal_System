import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeEmotion = async (text) => {

  try {

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const error = new Error("GEMINI_API_KEY is missing.");
      error.code = "GEMINI_KEY_MISSING";
      throw error;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

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

    const isInvalidKey =
      error?.status === 400 &&
      Array.isArray(error?.errorDetails) &&
      error.errorDetails.some((detail) => detail?.reason === "API_KEY_INVALID");

    if (isInvalidKey) {
      const authError = new Error("Gemini API key is invalid. Update GEMINI_API_KEY with a valid Google AI Studio key.");
      authError.code = "GEMINI_KEY_INVALID";
      throw authError;
    }

    throw error;

  }
};