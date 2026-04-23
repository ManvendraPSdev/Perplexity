import express from "express" ; 
import { registerController } from "../controllers/auth.controllers.js";
import validate from "../middlewares/validate.middleware.js";
import { register } from "../validators/auth.validator.js";

export const authRouter = express.Router() ; 

authRouter.post("/register" , register , validate , registerController) ; 
// authRouter.post("/login")