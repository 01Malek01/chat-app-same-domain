import { useEffect } from "react";
import { useSocket } from "../Context/SocketContext";
import useConversation from "../zustand/useConversations";
import { Message } from "./useGetMessages";

const useListenMessages = () => {
  const { socket, onlineUsers }  = useSocket() ??{};
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (message: Message) => {
        if (onlineUsers?.includes(message.sender)) {
          setMessages([...messages, message]);
        }
      };

      socket.on("newMessage", handleNewMessage);

      // Cleanup function
      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket, setMessages, messages, onlineUsers]);
};

export default useListenMessages;
