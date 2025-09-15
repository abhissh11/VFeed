import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

//http server
const server = http.createServer(app);

//socket.io setup for websocket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET, POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

server.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});
