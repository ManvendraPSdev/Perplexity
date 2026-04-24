import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.utils.js";

async function authenticate(req , res , next){
    const token = req.cookies.token ; 

    if(!token){
        return res.status(404).json({
            message : "token not found !!"
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
            message : "Invalid token"
        })
    }
}