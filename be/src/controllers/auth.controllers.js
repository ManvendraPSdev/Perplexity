import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken" ; 
import { sendEmail } from "../services/mail.service.js";

const shouldUseSecureCookie = () => {
    const nodeEnv = String(process.env.NODE_ENV || "").toLowerCase();
    if (nodeEnv === "production") return true;
    if (process.env.RENDER) return true;
    return String(process.env.CLIENT_URL || "").startsWith("https://");
};

/**
 * @route POST /api/auth/register
 * @desc register user
 * @acess Public
 */
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

        const enailVerificationToken = jwt.sign({
            email : user.email
        } , process.env.JWT_SECRET)

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
                            Verify and start discovering powerful features designed to boost your productivity and creativity.
                        </p>
            
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.BACKEND_URL || "http://localhost:3000"}/api/auth/verify-email?token=${enailVerificationToken}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                Verify
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


/**
 * @route GET /api/auth/verify-email
 * @desc Verify user email
 * @acess Public
 * @query {token}
 */

const verifyEmailController = async (req , res)=>{
    const {token} = req.query ; 

    const decoded = await jwt.verify(token , process.env.JWT_SECRET) ; 
    const user = await userModel.findOne({email : decoded.email}) ; 

    if(!user){
        return res.status(404).json({
            message : "Invalid token" , 
            sucess : false ,
            err : "user not found !!"
        })
    }

    user.verified = true ; 

    await user.save() ; 

    res.send(`
        <h1>Email verified sucessfully</h1>
        <p>Your email has been verified , you can now login into your acount</p>
    `)
}


/**
 * @route POST /api/auth/login
 * @desc login user
 * @acess Public
 */
const loginController = async(req , res)=>{
    try {
        const { email , password } = req.body ; 

        const user = await userModel.findOne({email}) ; 

        if(!user){
            return res.status(404).json({
                message : "Invalid email or password" , 
                sucess : false , 
                err : "user not found"
            })
        }

        const isPasswordValid = await user.comparePassword(password)
        if(!isPasswordValid){
            return res.status(401).json({
                message : "Invalid email or password" , 
                sucess : false , 
                err : "incorrect password"
            })
        }

        if(!user.verified){
            return res.status(403).json({
                message : "verification incomplete" , 
                sucess : false ,
                err : "please verify your email before logging in"
            })
        }

        const token = jwt.sign({id : user._id , userName : user.userName , email : user.email} , process.env.JWT_SECRET , {expiresIn : '7d'}) ; 

        const isSecureCookie = shouldUseSecureCookie();
        const cookieOptions = {
            httpOnly: true,
            secure: isSecureCookie,
            sameSite: isSecureCookie ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        };
    
        res.cookie("token" , token , cookieOptions) ; 

        return res.status(200).json({
            message : "user logged in sucessfully" , 
            sucess : true ,
            user : {
                id : user._id , 
                userName : user.userName , 
                email : user.email
            }
        })
    } catch (error) {
        console.error("Login failed:", error.message);
        return res.status(500).json({
            message: "Unable to login right now",
        });
    }

}


/**
 * @route GET /api/auth/getMe
 * @desc getMe 
 * @acess Private
 */
const getMeController = async(req , res)=>{
    try {
        const user = await userModel.findById(req.user.id).select("-password") ; 
    
        if(!user){
            return res.status(404).json({
                message : "user not found !!"
            })
        } ; 
    
        return res.status(200).json({
            message : "User details fetched successfully",
            user
        })
    } catch (error) {
        console.error("getMe failed:", error.message);
        return res.status(500).json({
            message: "Unable to fetch user details",
        });
    }
}

const logoutController = async (req, res) => {
    const isSecureCookie = shouldUseSecureCookie();
    const cookieOptions = {
        httpOnly: true,
        secure: isSecureCookie,
        sameSite: isSecureCookie ? "none" : "lax",
        path: "/",
    };
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "Logged out" });
};

export {registerController , verifyEmailController , loginController , getMeController , logoutController}