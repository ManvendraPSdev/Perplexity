import express from "express" ; 
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express() ; 

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json()) ; 
app.use(cookieParser()) ; 

import { authRouter } from "./routes/auth.routes.js";
import { chatRouter } from "./routes/chats.routes.js";

app.use("/api/auth" , authRouter)
app.use("/api/chats" , chatRouter)

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.message);
    return res.status(500).json({
        message: "Internal server error",
    });
});

export default app ; 