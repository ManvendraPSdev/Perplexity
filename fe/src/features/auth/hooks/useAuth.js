import { useDispatch } from "react-redux";
import { register , login , getMe } from "../services/auth.api";
import { setUser , setError , setLoading } from "../auth.slice";

export function useAuth(){
    const dispatch = useDispatch() ; 
    async function handelRegister({userName , email , password}){
        try {
            dispatch(setLoading(true)) ; 
            const data = await register({userName , email , password}) ; 
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
        }finally{
            dispatch(setLoading(false)) ; 
        }
    }

    async function handelLogin({email , password}){
        try {
            dispatch(setLoading(true)) ; 
            const data = await login({email , password}) ; 
            dispatch(setUser(data.user)) ; 
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login Failed")) ; 
        }finally{
            dispatch(setLoading(false)) ; 
        }
    }

    async function handelGetMe(){
        try {
            dispatch(setLoading(true)) 
            const data = await getMe() ; 
            dispatch(setUser(data.user)) ; 
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to fetch user")) ; 
        }finally{
            dispatch(setLoading(false))
        }
    }

    return{
        handelRegister , 
        handelLogin , 
        handelGetMe
    }
}