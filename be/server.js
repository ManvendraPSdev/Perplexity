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

function printRegisteredRoutes() {
    const stack = app?._router?.stack || [];
    const routes = [];

    for (const layer of stack) {
        if (!layer.route?.path) continue;
        const methods = Object.keys(layer.route.methods || {}).map((method) =>
            method.toUpperCase()
        );
        for (const method of methods) {
            routes.push(`${method} ${layer.route.path}`);
        }
    }

    console.log("Registered app routes:", routes.length ? routes : [
        "USE /api/auth",
        "USE /api/chats",
    ]);
}

httpServer.listen(PORT , ()=>{
    printRegisteredRoutes();
    console.log("Registered router mounts: USE /api/auth, USE /api/chats");
    console.log(`server is running on PORT ${PORT}`) ; 
})
