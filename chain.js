import { config } from "dotenv";
config();

import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.9,
  apiKey: process.env.GOOGLE_API_KEY,
  maxOutputTokens: 1024,
});

const prompt = PromptTemplate.fromTemplate(
  "Answer the following question: {question}"
);

const chain = prompt.pipe(model);

try {
  const response = await chain.invoke({
    question: "How is the situation in Iraq?",
  });

  console.log(response.content);
} catch (err) {
  console.error(err);
}