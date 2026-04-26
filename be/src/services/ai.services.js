import 'dotenv/config';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatMistralAI} from "@langchain/mistralai"
import {HumanMessage, SystemMessage} from "langchain"

const gemini_model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
});

const mistral_model = new ChatMistralAI({
  model : "mistral-small-latest" , 
  apiKey : process.env.MISTRAL_API_KEY
})

 export const aiResponse = async (message)=>{
    const response = await gemini_model.invoke([
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

export const generateTitle = async(message)=>{
  const response = await mistral_model.invoke([
    new SystemMessage(`You are a title generator.
  When given the first message of a conversation, generate a short, relevant, and catchy title for it.
  Rules:
- Maximum 6 words
- No punctuation at the end
- Title case formatting
- Do not explain — return ONLY the title, nothing else`)
    ,
    new HumanMessage(`Generate the title for a chat conversation based on the following first message: "${message}"`)
  ]) 

  if (typeof response?.text === "string" && response.text.trim()) {
    return response.text.trim();
  }

  if (typeof response?.content === "string" && response.content.trim()) {
    return response.content.trim();
  }

  return "New Chat";
  
}

