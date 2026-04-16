import dotenv from "dotenv" ; 
dotenv.config() ; 

import app from "./src/app.js";
import connectedToDB from "./src/config/db.js";

const PORT = process.env.PORT ; 
connectedToDB() ; 

app.listen(PORT , ()=>{
    console.log(`server is running on PORT ${PORT}`) ; 
})
