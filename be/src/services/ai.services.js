import 'dotenv/config';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {HumanMessage} from "langchain"

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
});

 export const aiResponse = async (message)=>{
    const response = await model.invoke([
      new HumanMessage(message)
    ]) ; 
    if (typeof response?.text === "string" && response.text.trim()) {
      return response.text;
    }

    if (typeof response?.content === "string" && response.content.trim()) {
      return response.content;
    }

    if (Array.isArray(response?.content)) {
      return response.content
        .map((item) => (typeof item === "string" ? item : item?.text || ""))
        .join("")
        .trim();
    }

    return "";
 }

