import {Server} from "socket.io" ; 

let io  ; //  the socket.io server is been represented by this io 

export function initSocket(httpServer){
    const allowedOrigins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://perplexity-liart.vercel.app",
        ...(process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
            : []),
    ];

    io = new Server(httpServer , {
        cors : {
            origin : allowedOrigins,
            credentials : true
        }
    })
    console.log("Socket.io server is running")
    io.on("connection" , (socket)=>{
        console.log("A user connected :"+ socket.id)
    })
}

export function getIO(){
    if(!io){
        throw new Error("Socket.io is not initialized")
    }
    return io ; 
}