
// import { useEffect, useState } from "react";

// const Chat = ({ socket }) => {
//   const [chat, setChat] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     socket.on("messageResponse", (data) => {
//       setChat((prevChats) => [...prevChats, data]);
//     });
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim() !== "") {
//       setChat((prevChats) => [...prevChats, { message, name: "You" }]);
//       socket.emit("message", { message });
//       setMessage("");
//     }
//   };

//   return (
//     // // <div
//     //   className="position-fixed top-50 h-100 text-white bg-dark"
//     //   style={{ width: "400px", left: "0%" }}
//     // >
//     <div
//       className="position-fixed text-white bg-dark d-flex flex-column"
//       style={{
//         width: "300px",
//         height: "600px", // ⬅️ taller now
//         bottom: "0",
//         left: "0",
//         zIndex: -500,
//         borderTopRightRadius: "8px",
//       }}
//     >
//       <div
//         className="w-100 mt-5 p-2 border  border-1 border-white rounded-3 overflow-auto"
//         style={{ height: "70%" }}
//       >
//         {chat.map((msg, index) => (
//           <p
//             key={index * 999}
//             className="my-2 text-center w-100 py-2 border border-left-0 border-right-0  "
//           >
//             {msg.name}: {msg.message}
//           </p>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="w-100 mt-4 d-flex rounded-3 ">
//         <input
//           type="text"
//           placeholder="Enter message"
//           className="h-100 border-0 rounded-0 py-2 px-4"
//           style={{
//             width: "90%",
//           }}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit" className="btn btn-primary rounded-0">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
import { useEffect, useState, useRef } from "react";

const Chat = ({ socket }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setChat((prevChats) => [...prevChats, data]);
    });
  }, []);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      setChat((prevChats) => [...prevChats, { message, name: "You" }]);
      socket.emit("message", { message });
      setMessage("");
    }
  };

  return (
    <div
      className="position-fixed bg-dark text-white shadow"
      style={{
        width: "300px",
        height: "600px",
        bottom: "10px", // Push slightly above bottom for visibility
        left: "10px",
        zIndex: 999, // Lower than Users panel
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="px-3 py-2"
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid white",
        }}
      >
        Chat Box
      </div>

      <div
        className="flex-grow-1 overflow-auto px-3 py-2"
        style={{
          maxHeight: "100%",
        }}
      >
        {chat.map((msg, index) => (
          <p
            key={index}
            className="text-sm leading-snug"
            style={{
              wordBreak: "break-word",         // Forces long words to break
              overflowWrap: "break-word",      // Additional safeguard
              whiteSpace: "pre-wrap",          // Preserves spacing + wraps
              overflowX: "hidden",             // Prevents horizontal scroll
              width: "100%",                   // Prevents shrinking
            }}
          >
            <strong style={{ wordBreak: "break-word" }}>{msg.name}:</strong> {msg.message}
          </p>

          /*<p key={index} className="my-1 break-words whitespace-pre-wrap">
            <strong>{msg.name}:</strong> {msg.message}
          </p>*/

        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="d-flex px-2 py-2 border-top"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ backgroundColor: "#2c2c2c", color: "white", border: "none" }}
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
