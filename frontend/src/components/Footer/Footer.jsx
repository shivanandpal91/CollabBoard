const Footer = () => {
  return (
    <footer
      className="text-center p-3 mt-5" // adds top margin using Bootstrap
      style={{
        backgroundColor: "#d4fcd4",
        borderTop: "2px solid #90ee90",
        borderRadius: "15px 15px 0 0",
        color: "#004d00",
        marginTop: "50px", // adds custom margin if needed more spacing
      }}
    >
      <h5 className="mb-1 fw-bold">CollabBoard Limited</h5>
      <p className="mb-1">
        Credits: Shivanshu Gupta, Shivanand Pal
      </p>
      <div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-decoration-none"
          style={{ color: "#C13584" }}
        >
          Instagram
        </a>
        |
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-decoration-none"
          style={{ color: "#3b5998" }}
        >
          Facebook
        </a>
      </div>
    </footer>
  );
};

export default Footer;
