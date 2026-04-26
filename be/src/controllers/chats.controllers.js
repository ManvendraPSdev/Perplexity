import {aiResponse, generateTitle} from "../services/ai.services.js";

const sendMessageController = async (req , res)=>{
    try {
        const {message} = req.body ; 

        if(!message || !String(message).trim()){
            return res.status(400).json({
                message: "message is required",
            });
        }

        const result = await aiResponse(message) ; 
        let chatTitle = "New Chat";
        try {
            chatTitle = await generateTitle(message) ; 
        } catch (titleError) {
            console.error("generateTitle failed:", titleError.message);
        }
        return res.status(200).json({title : chatTitle , response : result})
    } catch (error) {
        console.error("sendMessage failed:", error.message);
        return res.status(500).json({
            message: "Unable to get AI response",
        });
    }
}
export {sendMessageController}