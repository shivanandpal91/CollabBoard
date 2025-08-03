import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";

import "./App.css";

import Forms from "./components/Forms";
import Footer from "./components/Footer/Footer.jsx";
import FormHeader from "./components/Header/FormHeader";

import RoomPage from "./pages/RoomPage";
// const server = "http://localhost:5000";
const server = "https://collabboard-backend-0ir6.onrender.com";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [peers, setPeers] = useState({});
  const [myPeer, setMyPeer] = useState(null);
  const [openVideo, setOpenVideo] = useState(false);

  const videoGrid = useRef(null);

  const addVideoStream = (div, video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    div.append(video);
    videoGrid.current.append(div);
  };

  const connectToNewUser = (userId, name, stream) => {
    console.log(myPeer, stream);
    const call = myPeer.call(userId, stream);
    console.log("call", call);
    const div = document.createElement("div");
    div.id = userId;
    const video = document.createElement("video");
    const p = document.createElement("p");
    console.log(users);
    p.innerText = name;
    div.append(p);
    // call.on("stream", (userVideoStream) => {
    //   addVideoStream(div, video, userVideoStream);
    // });
    call.on("stream", (userVideoStream) => {
      // Save the stream to the div for cleanup
      video.srcObject = userVideoStream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });

      div.append(video);
      videoGrid.current.append(div);

      // Attach stream for cleanup later
      div.userVideoStream = userVideoStream;
      });


      
      // ✅ Proper cleanup when call is closed
      call.on("close", () => {
      const videoDiv = document.getElementById(userId);
      if (videoDiv) {
        // Stop video tracks
        const stream = videoDiv.userVideoStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        videoDiv.remove();
      }
      });

    setPeers((prevPeers) => {
      return { ...prevPeers, [userId]: call };
    });
  };

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        console.log("userJoined");
        setUsers(data.users);
      } else {
        console.log("userJoined error");
      }
    });

    socket.on("allUsers", (data) => {
      setUsers(data);
    });

    // socket.on("userLeftMessageBroadcasted", (data) => {
    //   console.log(`${data.name} ${data.userId} left the room`);
    //   toast.info(`${data.name} left the room`);
    //   if (peers[data.userId]) peers[data.userId].close();
    // });
    socket.on("userLeftMessageBroadcasted", (data) => {
      console.log(`${data.name} ${data.userId} left the room`);
      toast.info(`${data.name} left the room`);

      // Close peer connection if exists
      // if (peers[data.userId]) {
      //   peers[data.userId].close();
      //   delete peers[data.userId];
      // }
      setPeers(prev => {//this is changed********************
        if (prev[data.userId]) {
            prev[data.userId].close();
            const newPeers = { ...prev };
            delete newPeers[data.userId];
            return newPeers;
          }
        return prev;
      });

      // Explicit DOM cleanup (in case call.on('close') missed it)
      const videoDiv = document.getElementById(data.userId);
      if (videoDiv) {
        const stream = videoDiv.userVideoStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        videoDiv.remove();
      }
    });

  }, []);

  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

//   return (
//     <div className="container">
//       <ToastContainer />
//       <Routes>
//         <Route
//           path="/"
//           element = {
//             <div className="d-flex flex-column h-100">
//               <FormHeader />
//               <Forms
//                 uuid={uuid}
//                 setMyPeer={setMyPeer}
//                 socket={socket}
//                 setUser={setUser}
//               />
//               <Footer />
//             </div>
//           }
//         />
//         <Route
//           path="/:roomId"
//           element={
//             <>
//             <button
//               onClick={() => setOpenVideo(!openVideo)}
//               style={{
//                 position: "absolute",
//                 top: "60px", // moved downward
//                 right: "10px",
//                 zIndex: "100",
//                 backgroundColor: "#1E865A",
//                 border: "none",
//                 padding: "10px",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//             Open Video
//           </button>
//           <div
//             className="video-grid h-100 position-fixed top-0"
//             style={{
//               zIndex: 1000,
//               right: openVideo ? "0" : "-100%",
//             }}
//             ref={videoGrid}
//           >
//     <button
//       className="btn btn-light"
//       onClick={() => setOpenVideo(false)}
//     >
//       Close
//     </button>
//   </div>
  
//   <RoomPage
//     connectToNewUser={connectToNewUser}
//     addVideoStream={addVideoStream}
//     videoGrid={videoGrid}
//     user={user}
//     myPeer={myPeer}
//     setPeers={setPeers}
//     socket={socket}
//     users={users}
//     setUsers={setUsers}
//   />
//   <Footer start />
// </>

//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;
return (
  <div style={{ width: "100%", margin: 0, padding: 0 }}>
    <ToastContainer />
    <Routes>
      <Route
        path="/"
        element={
          <div className="d-flex flex-column h-100" style={{ width: "100%", margin: 0 }}>
            <FormHeader />
            <Forms
              uuid={uuid}
              setMyPeer={setMyPeer}
              socket={socket}
              setUser={setUser}
            />
            <Footer />
          </div>
        }
      />
      <Route
        path="/:roomId"
        element={
          <>
            <button
              className="open-video-button"
              onClick={() => setOpenVideo(!openVideo)}
              style={{
                position: "absolute",
                zIndex: "100",
                backgroundColor: "#0B5ED7", // Bootstrap primary blue
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontWeight: "500",
                fontSize: "15px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#084298")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#0B5ED7")}
            >
              Open Video
            </button>

            <div
              className="video-grid h-100 position-fixed top-0"
              style={{
                zIndex: 1000,
                right: openVideo ? "0" : "-100%",
                overflowY: "auto",     // Enables vertical scrolling
                overflowX: "hidden",   // Prevents horizontal scroll (optional)
                maxHeight: "100vh",    // Ensures it doesn’t go beyond the screen height
              }}
              ref={videoGrid}
            >
              <button
                className="btn btn-light"
                onClick={() => setOpenVideo(false)}
              >
                Close
              </button>
            </div>

            <RoomPage
              connectToNewUser={connectToNewUser}
              addVideoStream={addVideoStream}
              videoGrid={videoGrid}
              user={user}
              myPeer={myPeer}
              setPeers={setPeers}
              socket={socket}
              users={users}
              setUsers={setUsers}
            />
            <Footer start />
          </>
        }
      />
    </Routes>
  </div>
);
}
export default App;
