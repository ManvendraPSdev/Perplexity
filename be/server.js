import dotenv from "dotenv" ; 
dotenv.config() ; 

import app from "./src/app.js";
import http from "http" ; // for socket.io
import connectedToDB from "./src/config/db.js";
import { initSocket } from "./src/sockets/server.socket.js";

const PORT = process.env.PORT ; 

const httpServer = http.createServer(app) ; 
initSocket(httpServer) ; 

connectedToDB() ; 

httpServer.listen(PORT , ()=>{
    console.log(`server is running on PORT ${PORT}`) ; 
})
