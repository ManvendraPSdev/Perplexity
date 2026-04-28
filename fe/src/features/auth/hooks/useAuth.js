import { useDispatch } from "react-redux";
import { register , login , getMe, logout } from "../services/auth.api";
import { setUser , setError , setLoading } from "../state/auth.slice.js";

export function useAuth(){
    const dispatch = useDispatch() ; 
    async function handelRegister({userName , email , password}){
        try {
            dispatch(setLoading(true)) ; 
            dispatch(setError(null)) ; 
            const data = await register({userName , email , password}) ; 
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
            throw error;
        }finally{
            dispatch(setLoading(false)) ; 
        }
    }

    async function handelLogin({email , password}){
        try {
            dispatch(setLoading(true)) ; 
            dispatch(setError(null)) ; 
            const data = await login({email , password}) ; 
            dispatch(setUser(data.user)) ; 
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login Failed")) ; 
            throw error;
        }finally{
            dispatch(setLoading(false)) ; 
        }
    }

    async function handelGetMe(){
        try {
            dispatch(setLoading(true)) 
            dispatch(setError(null)) ; 
            const data = await getMe() ; 
            dispatch(setUser(data.user)) ; 
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to fetch user")) ;
            throw error;
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handelLogout(){
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            await logout();
            dispatch(setUser(null));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Logout failed"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    return{
        handelRegister , 
        handelLogin , 
        handelGetMe,
        handelLogout
    }
}