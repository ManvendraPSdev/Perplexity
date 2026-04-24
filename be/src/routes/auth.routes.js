import express from "express" ; 
import { getMeController, loginController, registerController, verifyEmailController } from "../controllers/auth.controllers.js";
import validate from "../middlewares/validate.middleware.js";
import { login, register } from "../validators/auth.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const authRouter = express.Router() ; 

authRouter.post("/register" , register , validate , registerController) ; 

authRouter.get("/verify-email" , verifyEmailController)

authRouter.post("/login" , login , validate , loginController)

authRouter.get("/getMe" , authenticate , getMeController) ; 