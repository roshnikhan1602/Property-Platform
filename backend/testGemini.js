const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

async function run() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Say hello",
  });

  console.log(response.text);
}

run().catch(console.error);