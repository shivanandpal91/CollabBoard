
//   starting a PeerJS server directly on a port, but Render already provides an HTTP server —  should not open a new port directly.
//  This approach does not allow you to attach CORS middleware (since you're not using Express).
// Will likely fail with “no open port” errors on Render or be inaccessible behind Vercel due to cross-origin port restrictions.


// const { PeerServer } = require("peer");
// const peerServer = PeerServer({ port: process.env.PORT || 5001, path: "/" });




const express = require("express");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");

const app = express();

// Enable CORS for your Vercel frontend
var corsOptions = {
  origin: ['http://localhost:5173', 'https://collab-board-front-ui.vercel.app/'],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials:true,
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// Create HTTP server
const server = app.listen(process.env.PORT || 5001, () => {
  console.log("Peer server running on port", process.env.PORT || 5001);
});

// Setup PeerJS
const peerServer = ExpressPeerServer(server, {
  path: "/",
  allow_discovery: true,
});

// Use peer middleware
app.use("/", peerServer);