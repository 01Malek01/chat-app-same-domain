import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversations";

export interface Message {
  _id: string;
  message: string;
  sender: string;
  conversationId: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
}

interface UseGetMessagesReturn {
  messages: Message[];
  loading: boolean;
}

export const useGetMessages = (): UseGetMessagesReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const getMessages = async () => {
    try {
      const res = await fetch(`/api/messages/${selectedConversation?._id}`, {
        method: "GET",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      setMessages(data);
    } catch (err) {
      console.log("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (selectedConversation?._id) {
      getMessages();
    } else {
      setLoading(false);
    }
  }, [selectedConversation?._id]);

  return { messages , loading };
};
