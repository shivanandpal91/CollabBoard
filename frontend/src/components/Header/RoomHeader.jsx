
import images from "../images.jpg"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const RoomHeader = ({ user, onLeave }) => {

  //fixing bug of accessing roompage by providing any invalid roomID 
   const navigate = useNavigate();
  useEffect(() => {
    if (!user?.name || !user?.roomId) {
      alert("Invalid or missing details. Please join or create a room with Valid Details.");
      navigate("/"); // Redirect to join page
    }
  }, [user]);
  //////////////////////////////
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
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Logo and Project Name */}
        <div className="d-flex align-items-center">
          <img
            src={images} // Replace with your actual logo path
            alt="Logo"
            style={{ height: "40px", marginRight: "10px", borderRadius: "5px" }}
          />
          <span
            className="navbar-brand"
            style={{
              color: "#7b06c8ff",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            ChitraBoard
          </span>
        </div>

        {/* Room Info */}
        <div style={{ color: "#7b06c8ff" }}>
          Room_Id: {user?.roomId || "Unknown"}
        </div>

        {/* User Info + Leave Button */}
        <div className="d-flex align-items-center">
          <span className="me-3" style={{ color: "#7b06c8ff" }}>
            You: {user?.name || "N/A"}
          </span>
          <button
            className="btn btn-sm"
            style={{
              backgroundColor: "#a84625ff",
              color: "white",
              fontWeight: 500,
              borderRadius: "10px",
            }}
            // onClick={onLeave}
            onClick={() => {
                if (window.confirm("Are you sure you want to leave the room?")) {
                  onLeave();
                }
              }}
          >
            Leave Room
          </button>
        </div>
      </div>
    </nav>
  );
};

export default RoomHeader;
