import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

export default function PublicRoute({ children }) {
    const { user, isLoading } = useAuth();

    if (isLoading) return null; // or a spinner

    if (user) return <Navigate to="/dashboard" replace />; // already logged in

    return children;
};