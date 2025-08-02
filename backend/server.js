const express = require("express");
const app = express();
const cors =require('cors');
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const { addUser, getUser, removeUser, getUsersInRoom } = require("./utils/users");

// const { PeerServer } = require("peer");

// const peerServer = PeerServer({
//   host:"/".
//   port: 5001,
//   path: "/",
// });

// app.use(peerServer);
var corsOptions = {
  origin: ['http://localhost:5173', 'https://collab-board-front-ui.vercel.app/'],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials:true,
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
const io = new Server(server);
// server.on("upgrade", (request, socket, head) => {});

// routes
app.get("/", (req, res) => {
  res.send(
    "This is mern realtime board sharing app"
  );
});

const canvasImg={};
io.on("connection", (socket) => {
  let roomIdGlobal;
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    const users = addUser({
      name,
      userId,
      roomId,
      host,
      presenter,
      socketId: socket.id,
    });
    socket.emit("userIsJoined", { success: true, users });
    console.log({ name, userId });
    // console.log(111);
    socket.broadcast.to(roomId).emit("allUsers", users);
    setTimeout(() => {
      socket.emit("whiteBoardDataResponse", { imgURL: canvasImg[roomIdGlobal] });
      socket.broadcast
        .to(roomId)
        .emit("userJoinedMessageBroadcasted", { name, userId, users });
      socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
        imgURL: canvasImg[roomIdGlobal],
      });
    }, 1000);
  });

  socket.on("whiteboardData", (data) => {
    canvasImg[roomIdGlobal] = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
      imgURL: data,
    });
  });

  socket.on("message", (data) => {
    const { message } = data;
    const user = getUser(socket.id);
    if (user) {
      socket.broadcast
        .to(roomIdGlobal)
        .emit("messageResponse", { message, name: user.name });
    }
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    // console.log("dhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    if (user) {
      removeUser(socket.id);
      const users=getUsersInRoom(user.roomId);
      socket.broadcast.to(roomIdGlobal).emit("allUsers", users);
      socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadcasted", {
        name: user.name,
        userId: user.userId,
      });
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () =>
  console.log("server is running on http://localhost:5000")
);
