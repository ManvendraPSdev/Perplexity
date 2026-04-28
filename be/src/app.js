import express from "express" ; 
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express() ; 

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://perplexity-liart.vercel.app",
    process.env.CLIENT_URL,
];

const normalizeOrigin = (origin) => origin?.replace(/\/$/, "");

app.use(cors({
    origin: (origin, callback) => {
        // Allow tools like Postman/cURL (no browser Origin header)
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.some(
            (allowedOrigin) =>
                allowedOrigin && normalizeOrigin(allowedOrigin) === normalizeOrigin(origin)
        );

        if (isAllowed) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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