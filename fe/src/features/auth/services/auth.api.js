import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api/auth" , 
    withCredentials : true
}) ; 

export async function register({userName , email , password}){
    try {
        const response = await api.post("/register" , {
            userName , email , password
        })
        return response.data ; 
    } catch (error) {
        console.log(error) ; 
        throw error ; 
    }
}