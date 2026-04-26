import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.js";
import {aiResponse, generateTitle} from "../services/ai.services.js";

const sendMessageController = async (req , res)=>{
        const {message , chat : chatId} = req.body ; 
        const userId = req.user.id

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

        let chatTitle = null ;
        let chat = null ; 

        if(!chatId){
            chatTitle = await generateTitle(message) ; 
            chat = await chatModel.create({
                user : userId , 
                title : chatTitle
            })
        }

        const userMessage = await messageModel.create({
            chat :  chatId || chat._id , 
            content : message , 
            role : "user"
        })

        const messages = await messageModel.find({chat : chatId}) ; 
        console.log(messages) ;

        const result = await aiResponse(messages) ; 
        

        const AI_Message = await messageModel.create({
            chat : chatId || chat._id , 
            content : result , 
            role : "ai"
        })

        console.log(messages) ; 
        return res.status(200).json({
            title : chatTitle , 
            chat, 
            userMessage : userMessage.content ,
            AI_Message : AI_Message.content
        })
    }
export {sendMessageController}
