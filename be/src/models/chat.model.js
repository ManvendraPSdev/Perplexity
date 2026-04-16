import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "users" , 
        require : [true , "ref of the user is required"]
    } , 
    title : {
        type : Stirng , 
        require: [true , "title of the chat is required"] , 
        trim : true
    }
} , {
    timestamps : true
}) ; 

const chatModel = mongoose.model("chats" , chatSchema) ; 
export default chatModel ; 