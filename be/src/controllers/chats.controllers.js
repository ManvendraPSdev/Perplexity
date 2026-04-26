import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.js";
import {aiResponse, generateTitle} from "../services/ai.services.js";

const sendMessageController = async (req , res)=>{
    try {
        const {message} = req.body ; 
        const userId = req.user.id ;  

        if(!message || !String(message).trim()){
            return res.status(400).json({
                message: "message is required",
            });
        }

        if(!userId){
            return res.status(401).json({
                message: "unauthorized",
            });
        }

        const result = await aiResponse(message) ; 
        let chatTitle = "New Chat";
        try {
            chatTitle = await generateTitle(message) ; 
        } catch (titleError) {
            console.error("generateTitle failed:", titleError.message);
        }

        const chat = await chatModel.create({
            user : userId , 
            title : chatTitle
        })

        const AI_Message = await messageModel({
            chatID : chat._id , 
            content : result , 
            role : "ai"
        })

        return res.status(200).json({
            title : chatTitle , 
            chat, 
            AI_Message
        })
    } catch (error) {
        console.error("sendMessage failed:", error.message);
        return res.status(500).json({
            message: "Unable to get AI response",
        });
    }

}
export {sendMessageController}