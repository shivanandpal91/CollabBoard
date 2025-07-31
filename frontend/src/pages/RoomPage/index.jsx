import { useState, useRef, useEffect } from "react";
import "./index.css";

import WhiteBoard from "../../components/Whiteboard";
import Chat from "../../components/ChatBar";
import RoomHeader from "../../components/Header/RoomHeader"; // adjust the path as per your project

import { toast } from "react-toastify";
  import { useLocation } from "react-router-dom";

const RoomPage = ({
  user,
  socket,
  users,
  videoGrid,
  setUsers,
  myPeer,
  setPeers,
  connectToNewUser,
  addVideoStream,
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [openedUserTab, setOpenedUserTab] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [stream, setStream] = useState(null);
  const [chat, setChat] = useState([]);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setElements([]);
  };
  useEffect(() => {}, [elements]);
  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    if (elements.length === 1) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillRect = "white";
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setElements((prevElements) =>
      prevElements.slice(0, prevElements.length - 1)
    );
  };

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };

  const adduserIdInP = async (p, call, div, video) => {
    p.innerText = "Other User";
    div.append(p);
    call.on("stream", (userVideoStream) => {
      addVideoStream(div, video, userVideoStream);
    });
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStream(stream);
        const div = document.createElement("div");
        div.id = user.userId;
        const p = document.createElement("p");
        p.innerText = user.name;
        div.append(p);
        const myVideo = document.createElement("video");
        
myVideo.muted = true; // ✅ Prevent echo from own audio


        addVideoStream(div, myVideo, stream);

        myPeer.on("call", (call) => {
          call.answer(stream);
          const div = document.createElement("div");
          div.id = call.peer;
          const video = document.createElement("video");
          const p = document.createElement("p");
          adduserIdInP(p, call, div, video);
        });
      });
  }, []);

  useEffect(() => {
    socket.on("userJoinedMessageBroadcasted", (data) => {
      toast.info(`${data.name} joined the room`);
      setUsers(data.users);
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          connectToNewUser(data.userId, data.name, stream);
        });
    });
  }, []);



//for accidental refresh
const location = useLocation();
useEffect(() => {
  const handleBeforeUnload = (e) => {
    if (location.pathname !== "/") {
      e.preventDefault();
      e.returnValue = "";
    }
  };
  window.addEventListener("beforeunload", handleBeforeUnload);
  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, [location]);

  return (
    <>
      {/* <RoomHeader user={user} onLeave={() => (window.location.href = "/")} /> */}
      <RoomHeader user={user} onLeave={() => (window.location.href = "/")} />


      {/* <div style={{ height: "80px" }}></div> */}
      <div className="row">
        <div>
          <button
            type="button"
            className="floating-button users-button"
            onClick={() => setOpenedUserTab(true)}
          >
            Users
          </button>

          {!showChat && (
            <button
              type="button"
              className="floating-button chat-button"
              onClick={() => setShowChat(true)}
            >
              Chat
            </button>
          )}


          <div
            className="w-100 text-center py-2 mb-3"
            style={{ overflowY: "auto" }}
          >
            <h2
              style={{
                fontSize: "1.75 rem",
                fontWeight: "600",
                color: "#1D4ED8",             // emerald-700
                backgroundColor: "#ECFDF5",   // emerald-50
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                display: "inline-block",
                marginBottom: "1rem",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
              }}
            >
            Online Users: {users.length}
          </h2>

          </div>
        </div>

        {showChat && (
          <Chat
            socket={socket}
            chat={chat}
            setChat={setChat}
            onClose={() => setShowChat(false)}
            isVisible={showChat}
          />
        )}

        {openedUserTab && (
          <div
            className="position-fixed top-0 h-100 text-white bg-dark"
            style={{ width: "250px", left: "0%", zIndex: 1020 }}
          >
            <button
              type="button"
              onClick={() => setOpenedUserTab(false)}
              className="btn btn-light btn-block w-100 mt-5"
            >
              Close
            </button>
            <div className="w-100 mt-5 pt-5">
              {users.map((usr, index) => (
                <p key={index * 999} className="my-2 text-center w-100 ">
                  {usr.name} {user && user.userId === usr.userId && "(You)"}
                </p>
              ))}
            </div>
          </div>
        )}

       <h2
        style={{
          fontSize: "2rem", // increased size
          fontWeight: "700",
          textAlign: "center",
          color: "#1E40AF", // blue-800
          backgroundColor: "#D1FAE5", // green-100
          padding: "0.75rem 1.5rem",
          borderRadius: "0.75rem",
          margin: "1.25rem auto",
          width: "fit-content",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >
        Real-time Shared Canvas
      </h2>



        {user?.presenter && (
          <div className="col-md-10 mx-auto px-5 mb-3 d-flex align-items-center justify-content-center flex-wrap gap-3">
            <div className="d-flex col-md-2 justify-content-center gap-2">
              {["pencil", "line", "rect"].map((t) => (
                <div key={t} className="d-flex gap-1 align-items-center">
                  <label htmlFor={t} className="text-capitalize">
                    {t}
                  </label>
                  <input
                    type="radio"
                    name="tool"
                    id={t}
                    checked={tool === t}
                    value={t}
                    className="mt-1"
                    onChange={(e) => setTool(e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="col-md-3 d-flex justify-content-center align-items-center gap-1">
              <label htmlFor="color">Color:</label>
              <input
                type="color"
                id="color"
                className="form-control form-control-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className="col-md-3 d-flex gap-2">
              <button
                className="btn btn-success mt-1"
                disabled={elements.length === 0}
                onClick={undo}
              >
                Undo
              </button>
              <button
                className="btn btn-outline-success mt-1"
                disabled={history.length < 1}
                onClick={redo}
              >
                Redo
              </button>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-danger mt-1"
                onClick={handleClearCanvas}
              >
                Clear Canvas
              </button>
            </div>
          </div>
        )}

        <div className="col-md-10 mx-auto mt-4 canvas-box">
          <WhiteBoard
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            color={color}
            tool={tool}
            user={user}
            socket={socket}
          />
        </div>
        <div style={{ height: "80px" }}></div>
      </div>
    </>
  );
};

export default RoomPage;
