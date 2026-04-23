import express from "express" ; 
import { registerController } from "../controllers/auth.controllers.js";

export const authRouter = express.Router() ; 

authRouter.post("/register" , registerController)