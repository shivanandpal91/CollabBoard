import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Peer from "peerjs";

const CreateRoomForm = ({ uuid, socket, setUser, setMyPeer }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false); // prevent multiple clicks
  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    
    if (creating || !name) return;

    setCreating(true); // lock button

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
        host: true,
        presenter: true,
      };
      setUser(roomData);
      navigate(`/${roomId}`);
      console.log(roomData);
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
      <div className="form-group border" style={{ borderColor: "#90ee90" }}>
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border-0"
            disabled
            placeholder="Generate room code"
            style={{ backgroundColor: "#f4fff4", color: "#000" }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-success btn-sm me-1"
              onClick={() => setRoomId(uuid())}
              type="button"
              style={{ backgroundColor: "#90ee90", borderColor: "#90ee90", color: "#000" }}
            >
              generate
            </button>
            <button
              className="btn btn-outline-success btn-sm me-2"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(roomId);
                toast.success("Room ID copied!");
              }}
              style={{ borderColor: "#90ee90", color: "#228B22" }}
            >
              copy
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={handleCreateRoom}
        className="mt-4 btn btn-success btn-block form-control"
        style={{ backgroundColor: "#47df47ff", borderColor: "#90ee90" }}
      >
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
