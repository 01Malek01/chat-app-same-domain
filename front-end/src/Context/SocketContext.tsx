import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { io, Socket } from "socket.io-client";

// Define the type for the user object from useAuth
interface User {
  _id: string;
  name: string;
  profilePic: string;
  displayName: string;
  email: string;
  token: string;
  gender: string;
  
}

// Define the type for the context value
interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

// Define the type for the provider props
interface SocketProviderProps {
  children: ReactNode;
}

// Create the context with an initial value of null for socket and an empty array for onlineUsers
export const SocketContext = createContext<SocketContextType | null>(null);

// Custom hook to use the Socket context
export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useAuth() as { user: User | null };

  useEffect(() => {
    if (user) {
      // If user is logged in, open socket connection
      const newSocket = io("http://localhost:5000", {
        query: { userId: user._id },
      });

      // Set the socket instance
      setSocket(newSocket);

      // Listen to getOnlineUsers event we made on server
      newSocket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      // Close socket on unmount (cleanup function)
      return () => {
        newSocket.close();
      };
    } else {
      if (socket) socket.close();
      setSocket(null);
    }
  }, [user]);

  useEffect(() => {
    // Log the online users whenever it changes
    console.log("====================================");
    console.log("Online Users:", onlineUsers);
    console.log("Socket:", socket);
    console.log("====================================");
  }, [onlineUsers]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
