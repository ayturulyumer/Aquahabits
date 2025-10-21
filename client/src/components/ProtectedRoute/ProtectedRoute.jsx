import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
