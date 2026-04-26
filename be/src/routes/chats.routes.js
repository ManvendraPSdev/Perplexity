import express from "express" ; 
import { authenticate } from "../middlewares/auth.middleware.js";
import { deleteChats, getChats, getMessages, sendMessageController } from "../controllers/chats.controllers.js";

export const chatRouter = express.Router() ; 

chatRouter.post("/message" , authenticate , sendMessageController) ; 

chatRouter.get("/" , authenticate , getChats) ; 
chatRouter.get("/:chatId/messages" , authenticate , getMessages) ; 
chatRouter.delete("/delete/:chatId" , authenticate , deleteChats)
