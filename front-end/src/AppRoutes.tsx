import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import { useAuth } from "./Context/AuthContext";

export default function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/"  element={user ? <Home /> : <Navigate to="/login" />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />{" "}
    </Routes>
  );
}
