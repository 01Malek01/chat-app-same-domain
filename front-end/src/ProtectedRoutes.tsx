import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

export default function ProtectedRoutes() {
  const { user } = useAuth();

  return !user ? <Outlet /> : <Navigate to="/" replace />;
}
