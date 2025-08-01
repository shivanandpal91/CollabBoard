import images from "../images.jpg"; // adjust the path to your logo image

const FormHeader = () => {
  return (
    <nav
      className="navbar navbar-expand-lg mx-3 mt-3 shadow"
      style={{
        backgroundColor: "#4aed4a",
        borderRadius: "15px",
        padding: "10px 20px",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-start gap-3">
        <img
          src={images}
          alt="Logo"
          style={{ height: "40px", width: "40px", borderRadius: "50%" }}
        />
        <span
          className="navbar-brand mb-0 h1 fw-bold "
          style={{
            color: "#004d00",
            fontSize: "1.8rem",
            letterSpacing: "1px",
          }}
        >
          ChitraBoard
        </span>
      </div>
    </nav>
  );
};

export default FormHeader;
