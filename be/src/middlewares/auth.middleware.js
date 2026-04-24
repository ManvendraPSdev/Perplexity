import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.utils.js";

async function authenticate(req , res , next){
    const token = req.cookies.token ; 

    if(!token){
        return res.status(404).json({
            message : "unauthorized" , 
            sucess : false , 
            err : "No token provided"
        })
    }

    let decoded = null ; 
    try {
        decoded = jwt.verify(token , process.env.JWT_SECRET) ; 
        req.user = decoded ; 
        next() ; 
    } catch (error) {
        console.log(error.message) ; 
        return res.status(400).json({
            message : "unAuthorised" , 
            sucess : false ,
            err : "Invalid token"
        })
    }
}

export {authenticate}