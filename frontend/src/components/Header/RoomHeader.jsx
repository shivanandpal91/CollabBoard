const RoomHeader = ({ user, onLeave }) => {
  return (
    <nav
      className="navbar navbar-expand-md w-100"
      style={{
        backgroundColor: "#55dc99ff",
        padding: "0.4rem 1rem",
        color: "white",
        fontSize: "1rem",
        fontWeight: 500,
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="container-fluid">
        <div className="navbar-brand text-white">
          Room_Id: {user?.roomId || "Unknown"}
        </div>

        <div className="d-flex ms-auto align-items-center">
          <span className="me-3">You: {user?.name || "N/A"}</span>
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#a84625ff",
              color: "white",
              fontWeight: 500,
              borderRadius: "10px",
            }}
            onClick={onLeave}
          >
            Leave Room
          </button>
        </div>
      </div>
    </nav>
  );
};

export default RoomHeader;
