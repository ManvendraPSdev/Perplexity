import express from "express" ; 
import cookieParser from "cookie-parser";


const app = express() ; 

app.use(express.json()) ; 
app.use(cookieParser()) ; 

import { authRouter } from "./routes/auth.routes.js";

app.use("/api/auth" , authRouter)

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.message);
    return res.status(500).json({
        message: "Internal server error",
    });
});

export default app ; 