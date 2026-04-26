import express from "express" ; 
import { authenticate } from "../middlewares/auth.middleware.js";
import { sendMessageController } from "../controllers/chats.controllers.js";

export const chatRouter = express.Router() ; 

chatRouter.post("/message" , authenticate , sendMessageController) ; 

