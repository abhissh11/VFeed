import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { initSocket } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

//http server
const server = http.createServer(app);

//socket.io setup for websocket
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});
