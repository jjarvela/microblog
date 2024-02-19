import cors from "cors";
import { createServer } from "https";
import { Server } from "socket.io";
import { getSocket, updateSocket } from "../services/userQueries";
import "dotenv/config";

/**
 * Set up httpsServer for socket.io
 * io settings in ./socket
 */
const httpsServer = createServer();

export const io = new Server(httpsServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

type User = { userId: string; socket_id: string };

io.on("connection", (socket) => {
  console.log("connected to socket " + socket.id);

  socket.emit("poll-user");

  socket.on("add-user", async (userId) => {
    console.log("Adding user");
    const user = await updateSocket(userId, socket.id);
    socket.emit("get-active-user", user);
  });

  socket.on("remove-active-user", async (userId) => {
    if (userId) {
      const user = await updateSocket(userId, null);
      socket.emit("get-active-user", user);
    }
  });

  socket.on("send-notification", async (userId) => {
    if (userId) {
      console.log("Notification processing");
      const user = await getSocket(userId);
      console.log(user);
      (user as User).socket_id &&
        socket.to((user as User).socket_id).emit("received-notification");
    }
  });

  socket.on("send-message", async (userId) => {
    if (userId) {
      console.log("Message processing");
      const user = await getSocket(userId);
      console.log(user);
      (user as User).socket_id &&
        socket.to((user as User).socket_id).emit("received-message");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
