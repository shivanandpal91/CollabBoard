// const Footer = () => {
//   return (
//     <footer
//       className="text-center p-3 mt-5" // adds top margin using Bootstrap
//       style={{
//         backgroundColor: "#d4fcd4",
//         borderTop: "2px solid #90ee90",
//         borderRadius: "15px 15px 0 0",
//         color: "#004d00",
//         marginTop: "50px", // adds custom margin if needed more spacing
//       }}
//     >
//       <h5 className="mb-1 fw-bold">CollabBoard Limited</h5>
//       <p className="mb-1">
//         Credits: Shivanshu Gupta, Shivanand Pal
//       </p>
//       <div>
//         <a
//           href="https://instagram.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mx-2 text-decoration-none"
//           style={{ color: "#C13584" }}
//         >
//           Instagram
//         </a>
//         |
//         <a
//           href="https://facebook.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mx-2 text-decoration-none"
//           style={{ color: "#3b5998" }}
//         >
//           Facebook
//         </a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const About = () => {
  return (
    <div style={{ background: "linear-gradient(to bottom right, #000, #1f2937)", color: "#fff", padding: "60px 20px", fontFamily: "Segoe UI, sans-serif", minHeight: "50vh", width: "100vw", boxSizing: "border-box" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#34d399", marginBottom: "40px" }}>About</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>📄 Project Overview</h2>
              <p>"Collaborative whiteboard with real-time drawing and built-in chat, enabling users to join or create rooms for interactive sessions."</p>
            </div>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>🧠 Tech Stack</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "14px" }}>
                {["React.js", "Tailwind CSS", "Socket.IO", "Node.js", "Express.js", "Canvas API","WebRTC","Peerjs"].map((tech, idx) => (
                  <span key={idx} style={{ backgroundColor: "#374151", padding: "6px 14px", borderRadius: "9999px" }}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>👨‍💻 Developed By</h2>
              <p style={{ fontSize: "14px", color: "#d1d5db" }}><span style={{ color: "#34d399", fontWeight: "500" }}>Shivanand Pal</span> — CSE undergrad who likes building stuffs</p>
              <p style={{ fontSize: "14px", color: "#d1d5db" }}><span style={{ color: "#34d399", fontWeight: "500" }}>Shivanshu Gupta</span> — CSE undergrad </p>
            </div>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>📫 Let's Connect</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "20px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <p style={{ fontSize: "14px", color: "#d1d5db" }}><span style={{ color: "#34d399", fontWeight: "500" }}>Shivanand Pal</span> </p>
                  <a href="https://github.com/shivanandpal91" target="_blank" rel="noreferrer" style={{ color: "#fff" }}><FaGithub /></a>
                  <a href="https://linkedin.com/in/shivanandpal91/" target="_blank" rel="noreferrer" style={{ color: "#60a5fa" }}><FaLinkedin /></a>
                  <a href="mailto:externalemail2024@gmail.com" style={{ color: "#f87171" }}><FaEnvelope /></a>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                <p style={{ fontSize: "14px", color: "#d1d5db" }}><span style={{ color: "#34d399", fontWeight: "500" }}>Shivanshu Gupta</span></p>
                  <a href="#" target="_blank" rel="noreferrer" style={{ color: "#fff" }}><FaGithub /></a>
                  <a href="#" target="_blank" rel="noreferrer" style={{ color: "#60a5fa" }}><FaLinkedin /></a>
                  <a href="mailto:yourmate@email.com" style={{ color: "#f87171" }}><FaEnvelope /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", marginTop: "40px" }}>
          © {new Date().getFullYear()} <span style={{ color: "#fff", fontWeight: "500" }}>Shivanshu Gupta & Shivanand Pal </span>. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
