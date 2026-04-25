import { BrowserRouter , Routes , Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import HomePage from "./pages/HomePage";

export function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<HomePage/>} />
            </Routes>
        </BrowserRouter>
    )
}