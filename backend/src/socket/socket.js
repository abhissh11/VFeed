import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // 👈 allow frontend
      methods: ["GET", "POST"],
      credentials: true, // 👈 important
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ New connection:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
        }
      }
    });
  });
};

export const sendNotification = (recipientId, notification) => {
  const socketId = onlineUsers.get(recipientId);
  if (socketId) {
    io.to(socketId).emit("notification", notification);
  }
};
