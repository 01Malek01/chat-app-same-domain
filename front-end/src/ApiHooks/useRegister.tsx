import { useState } from "react";
import { SignUpFormValues } from "../pages/SignUp";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (data: SignUpFormValues) => {
    if (!data || !data.email || !data.password || !data.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log("API response:", result); // Debug: log the API response

      if (!res.ok) {
        // Provide more specific error messages based on the response status
        if (res.status === 400) {
          toast.error("Bad request. Please check your input data.");
        } else if (res.status === 409) {
          toast.error("User already exists.");
        } else if (res.status === 500) {
          toast.error("Internal server error. Please try again later.");
        }
      } else {
        toast.success("Registration successful!");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { register, isLoading: loading };
};
