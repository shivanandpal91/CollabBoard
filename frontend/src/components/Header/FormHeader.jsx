const FormHeader = () => {
  return (
    <nav
      className="navbar navbar-expand-lg mx-3 mt-3 rounded shadow"
      style={{
        backgroundColor: "#4aed4aff",
        borderRadius: "15px",
      }}
    >
      <div className="container-fluid justify-content-center">
        <span className="navbar-brand mb-0 h1 fw-bold" style={{ color: "#004d00" }}>
          CollabBoard
        </span>
      </div>
    </nav>
  );
};

export default FormHeader;
