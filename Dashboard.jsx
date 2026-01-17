import { Link } from "react-router-dom";

export default function Dashboard() {
  const buttonStyle = {
    background: "var(--card-bg)",       // card background variable
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid var(--primary-pink)",
    fontWeight: "500",
    textAlign: "center",
    transition: "0.3s"
  };

  const linkStyle = {
    textDecoration: "none",
    color: "var(--primary-pink)",       // pink accent variable
    fontWeight: "600",
    display: "block"
  };

  return (
    <div
      style={{
        background: "var(--light-pink)", // page background variable
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
        color: "var(--text-color)"       // text color variable
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "var(--card-bg)",  // card background variable
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          padding: "40px",
          textAlign: "center",
          color: "var(--text-color)"     // text color variable
        }}
      >
        <h2
          style={{
            color: "var(--primary-pink)", // heading accent
            marginBottom: "20px",
            fontWeight: "600"
          }}
        >
          🎀 Admin Dashboard
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "25px" }}>
          Quick links are available in the navbar:
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gap: "12px",
            fontSize: "15px"
          }}
        >
          <li style={buttonStyle}>
            <Link to="/students" style={linkStyle}>🧑‍🎓 Students</Link>
          </li>
          <li style={buttonStyle}>
            <Link to="/subjects" style={linkStyle}>📚 Subjects</Link>
          </li>
          <li style={buttonStyle}>
            <Link to="/results" style={linkStyle}>📊 Results</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
