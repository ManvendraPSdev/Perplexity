import API from "../../../config/apiClient";

export async function register({userName , email , password}){
    try {
        const response = await API.post("/api/auth/register" , {
            userName , email , password
        })
        return response.data ; 
    } catch (error) {
        console.log(error) ; 
        throw error ; 
    }
}

export async function login({email , password}){
    try {
        const response = await API.post("/api/auth/login" , {
            email,
            password
        })
        return response.data ; 
    } catch (error) {
        console.log(error) ; 
        throw error ; 
    }
}

export async function getMe(){
    try {
        const response = await API.get("/api/auth/getMe") ; 
        return response.data ; 
    } catch (error) {
        console.log(error) ; 
        throw error ; 
    }
}

export async function logout(){
    try {
        const response = await API.post("/api/auth/logout") ; 
        return response.data ; 
    } catch (error) {
        console.log(error) ; 
        throw error ; 
    }
}