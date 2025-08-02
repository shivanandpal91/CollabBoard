import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";

const JoinRoomForm = ({ uuid, socket, setUser, setMyPeer }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [joining, setJoining] = useState(false);  // <-- new state flag
  const navigate = useNavigate();

  const handleRoomJoin = (e) => {
    e.preventDefault();
    
    if (joining || !roomId || !name) return;  // prevent double join or empty inputs
    setJoining(true); // disable button immediately
    
    // const myPeer = new Peer(undefined, {
    //   host: "/",
    //   port: 5001,
    //   path: "/",
    //   secure: false,
    // });
    const myPeer = new Peer(undefined, {
      host: "collabboard-a0su.onrender.com", // Your deployed domain
      port: 443,           // HTTPS port
      path: "/",     // Use this if you used "--path /peerjs" when starting PeerServer
      secure: true,        // Must be true for HTTPS
    });

    setMyPeer(myPeer);

    myPeer.on("open", (id) => {
      const roomData = {
        name,
        roomId,
        userId: id,
        host: false,
        presenter: false,
      };
      setUser(roomData);
      navigate(`/${roomId}`);
      socket.emit("userJoined", roomData);
    });

    myPeer.on("error", (err) => {
      console.log("peer connection error", err);
      myPeer.reconnect();
    });
  };

  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ borderColor: "#90ee90" }}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter room code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{ borderColor: "#90ee90" }}
        />
      </div>
      <button
        type="submit"
        onClick={handleRoomJoin}
        className="mt-4 btn btn-success btn-block form-control"
        style={{ backgroundColor: "#47df47ff", borderColor: "#90ee90" }}
      >
        Join Room
      </button>
    </form>
  );
};

export default JoinRoomForm;
