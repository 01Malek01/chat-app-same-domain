import { useState } from "react";
import useConversation from "../zustand/useConversations";
import toast from "react-hot-toast";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: { message: string}) => {
    if (!message) {
      toast.error("You didn't type anything");
      return;
    }

    if (!selectedConversation || !selectedConversation._id) {
      toast.error("No conversation selected");
      return;
    }

  

    try {
      setLoading(true);

      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( message ),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setMessages( [...messages, result]);
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
