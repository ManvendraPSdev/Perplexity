// For managing this function we will use the hooks

import {io} from "socket.io-client" ; 
import { SOCKET_BASE_URL } from "../../../config/api";

export const initializedSocketConnection = ()=>{
    const socket = io(SOCKET_BASE_URL , {
        withCredentials : true
    }) ; 
    socket.on("connect" , ()=>{
        console.log("Connected to the Socket.io server")
    })
    return socket;
}