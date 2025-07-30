import { useState } from "react";
import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";
import "./index.css";

const Forms = ({ uuid, socket, setUser, setMyPeer }) => {
  const [showCreate, setShowCreate] = useState(true);

  return (
    <div className="d-flex flex-column align-items-center h-100 pt-5">
      <div className="mb-4">
        <button
          className={`btn mx-2 ${showCreate ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setShowCreate(true)}
        >
          Create Room
        </button>
        <button
          className={`btn mx-2 ${!showCreate ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setShowCreate(false)}
        >
          Join Room
        </button>
      </div>

      <div
        className="col-md-4 form-box p-5 border rounded-2 mx-auto d-flex flex-column align-items-center"
        style={{ borderColor: "#90ee90" }}
      >
        <h1 className="fw-bold mb-4" style={{ color: "#228B22" }}>
          {showCreate ? "Create Room" : "Join Room"}
        </h1>

        {showCreate ? (
          <CreateRoomForm
            uuid={uuid}
            setMyPeer={setMyPeer}
            socket={socket}
            setUser={setUser}
          />
        ) : (
          <JoinRoomForm
            uuid={uuid}
            setMyPeer={setMyPeer}
            socket={socket}
            setUser={setUser}
          />
        )}
      </div>
    </div>
  );
};

export default Forms;
