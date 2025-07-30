import { useEffect, useState, useRef } from "react";

const Chat = ({ socket, onClose, chat, setChat, isVisible }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handler = (data) => {
      setChat((prevChats) => [...prevChats, data]);
    };
    socket.on("messageResponse", handler);
    return () => {
      socket.off("messageResponse", handler); // clean up listener
    };
  }, [socket, setChat]);

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
        bottom: "10px",
        left: "10px",
        zIndex: 999,
        borderRadius: "8px",
        display: isVisible ? "flex" : "none", // toggle visibility
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
        {onClose && (
          <button className="btn btn-success w-100 mt-2" onClick={onClose}>
            Close Chat
          </button>
        )}
      </div>

      <div
        className="flex-grow-1 overflow-auto px-3 py-2"
        style={{ maxHeight: "100%" }}
      >
        {chat.map((msg, index) => (
          <p
            key={index}
            className="text-sm leading-snug"
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            <strong>{msg.name}:</strong> {msg.message}
          </p>
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
          placeholder="Type message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            backgroundColor: "#0fcedfff",
            color: "white",
            border: "none",
          }}
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
