import 'dotenv/config';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
});

export const response = await model.invoke("What is the capital of India") ; 

console.log(response.content) ; 

