import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken" ; 
import { sendEmail } from "../services/mail.service.js";

const registerController = async (req , res)=>{
    try {
        const {userName , email , password} = req.body ; 

        const isUserExist = await userModel.findOne({
            $or : [{userName} , {email}]
        })

        if(isUserExist){
            return res.status(409).json({
                message : "user already exists"
            })
        }
        const user = await userModel.create({
            userName , 
            email , 
            password
        }) ; 

        try {
            await sendEmail({
                to: email,
                subject: "Welcome to Perplexity",
                text: `Hi ${userName} , \n\n Welcome to Perplexity! Your account has been successfully created.\nWe're excited to have you on board `,
                html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        
                        <h2 style="color: #333; text-align: center;">Welcome to Perplexity 🚀</h2>
                        
                        <p style="font-size: 16px; color: #555;">
                            Hi <strong>${userName}</strong>,
                        </p>
            
                        <p style="font-size: 16px; color: #555;">
                            We're excited to have you on board! Your account has been successfully created, and you're now ready to explore everything Perplexity has to offer.
                        </p>
            
                        <p style="font-size: 16px; color: #555;">
                            Dive in and start discovering powerful features designed to boost your productivity and creativity.
                        </p>
            
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="#" style="background-color: #4f46e5; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                Get Started
                            </a>
                        </div>
            
                        <p style="font-size: 14px; color: #888;">
                            If you have any questions, feel free to reach out to our support team anytime.
                        </p>
            
                        <p style="font-size: 14px; color: #888;">
                            — Team Perplexity
                        </p>
            
                    </div>
                </div>
                `
            });
        } catch (mailError) {
            console.error("Welcome email failed:", mailError.message);
        }
    // const token = jwt.sign({email : user.email} , process.env.JWT_SECRET , {expiresIn : "3d"}) ; 

    // const cookieOptions = {
    //     httpOnly : true , 
    //     secure : process.env.NODE_ENV === "production" ,
    //     sameSite : process.env.NODE_ENV==="production" ? "none" : "lax" ,
    //     maxAge : 7 * 24 * 60 * 60 * 1000,
    // }

    // res.cookie("token" , token , cookieOptions) ; 

        return res.status(201).json({
            message : "user registerd sucessfully" , 
            user : {
                userName : user.userName , 
                email : user.email
            }
        })
    } catch (error) {
        console.error("Registration failed:", error.message);
        return res.status(500).json({
            message: "Unable to register user right now",
        });
    }
}

// const loginController = async (req , res)=>{

// }

export {registerController}