import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export const useGetConversations = () => {
 const [loading , setLoading] = useState(false);
 const [conversations , setConversations] = useState([]);
 const getConversations = async () => {
  //  setLoading(true);
   try {
     const res = await fetch("/api/users",{
       method : "GET",
    
     });
     const data = await res.json();
  
     if (!res.ok) {
       throw new Error(data.message); //throwing error to catch in catch block
     }
     setConversations(data);
     setLoading(false);
   } catch (err) {
     console.log("====================================");
     console.log(err);
     console.log("====================================");
     toast.error("Something went wrong");
   }finally{
    // setLoading(false);
   }
 };
 useEffect(() => {
   getConversations();
  
 }, []);

 return {conversations , loading}
 
}