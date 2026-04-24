import { BrowserRouter , Routes , Route } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

export function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    )
}