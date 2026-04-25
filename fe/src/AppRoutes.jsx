import { BrowserRouter , Routes , Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import HomePage from "./pages/HomePage";
import { useAuth } from "./features/auth/hooks/useAuth";

function AuthBootstrap() {
    const { user } = useSelector((state) => state.auth);
    const { handelGetMe } = useAuth();

    useEffect(() => {
        if (!user) {
            handelGetMe().catch(() => {});
        }
    }, [user]);

    return null;
}

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.auth);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

function PublicOnlyRoute({ children }) {
    const { user } = useSelector((state) => state.auth);
    if (user) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export function AppRoutes(){
    return(
        <BrowserRouter>
            <AuthBootstrap />
            <Routes>
                <Route path="/register" element={<PublicOnlyRoute><Register/></PublicOnlyRoute>}/>
                <Route path="/login" element={<PublicOnlyRoute><Login/></PublicOnlyRoute>} />
                <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}