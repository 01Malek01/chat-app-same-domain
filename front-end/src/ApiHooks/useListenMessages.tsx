import { useEffect } from "react";
import { useSocket } from "../Context/SocketContext"
import useConversation from "../zustand/useConversations";

const useListenMessages = () => {

const {socket,onlineUsers}=  useSocket();
const {messages,setMessages} = useConversation();

 useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        if (onlineUsers.includes(message.sender)) {
          setMessages( [...messages, message]);
        }
      });
    }
    //it's important to add cleanup function
    return () => {
      socket?.off("newMessage");
    }
  }, [socket,setMessages,messages,onlineUsers]);

}

export default useListenMessages