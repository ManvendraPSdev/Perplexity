import mongoose from "mongoose";
import bcrypt from "bcryptjs" ; 

const userSchema = new mongoose.Schema({
    userName : {
        type : String ,
        require : [true , "userName is required"] , 
    } , 
    email : {
        type : String , 
        require : [true , "email is required"] , 
        unique : true 
    } ,
    password : {
        type : String , 
        require : [true , "password is required"]
    } , 
    verified : {
        type : Boolean ,
        default : false
    }
} , {
    timestamps : true
}) ; 

userSchema.pre('save' , async function(next){
    if(!this.isModified("password")) return next(); 
    this.password = await bcrypt.hash(this.password , 10) ; 
    next() ;
})

userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword , this.password) ; 
}

const userModel = mongoose.model("users" , userSchema) ; 
export default userModel ; 