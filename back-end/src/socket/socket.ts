import { Server } from "socket.io";
// import http from "http";
import { server } from "../app";
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}
// userId:socketId
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("====================================");
  console.log("Socket connected", socket.id);
  console.log("====================================");
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }
  //io.emit is used to emit events to all connected clients
  //event name is getOnlineUsers , data is Object.keys(userSocketMap)
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on is used to listen to events,can be used on both client and server
  socket.on("disconnect", () => {
    console.log("====================================");
    console.log("Socket disconnected", socket.id);
    console.log("====================================");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server };
