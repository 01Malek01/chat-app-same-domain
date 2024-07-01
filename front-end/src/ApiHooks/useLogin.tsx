import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const login = async (data: { email: string; password: string }) => {
    if (!data || !data.email || !data.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {

      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
        setLoading(false);
        return;
      }
      localStorage.setItem(
        "chat-user",
        JSON.stringify({
          result,
        })
      );
      setUser(result);
      setLoading(false);
      toast.success("Login successful");

      <Navigate to="/" />;
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Something went wrong");
    }
  };

  return { login, loading };
};
