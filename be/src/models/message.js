import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chat : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "chats" , 
        require : [true , "ref ofthe chat is require"]
    } , 
    content : {
        type : String ,
        require : [true , "content inside the message is required"]
    } , 
    role : {
        type : String ,
        enum : ["user" , "ai"] , 
        require : [true , "role is required"]
    }
} , {timestamps : true}) ; 

const messageModel = mongoose.model("messages" , messageSchema) ; 

export default messageModel ; 