import express from "express" ; 
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express() ; 

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://perplexity-liart.vercel.app",
    ...(process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
        : []),
];

const normalizeOrigin = (origin) => origin?.replace(/\/$/, "");

app.use(cors({
    origin: (origin, callback) => {
        // Allow tools like Postman/cURL (no browser Origin header)
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.some(
            (allowedOrigin) => normalizeOrigin(allowedOrigin) === normalizeOrigin(origin)
        );

        if (isAllowed) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
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