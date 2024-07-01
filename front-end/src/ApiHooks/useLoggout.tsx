import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";

export const useLoggout = () => {
 const { setUser } = useAuth();
  const logout = async () => {
    try {
      const res = await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message);
      } else {
        toast.success("Logged out successfully");
      }
      localStorage.removeItem("chat-user");
      setUser(null);
    } catch (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      toast.error("Something went wrong");
    }
  };

  return { logout };
};
