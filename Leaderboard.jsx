import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await api.get("/leaderboard");
        setLeaders(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div style={{
      background: "var(--light-pink)",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
      padding: "20px",
      color: "var(--text-color)"
    }}>
      <div style={{
        maxWidth: 700,
        width: "100%",
        background: "var(--card-bg)",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        padding: "30px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "var(--primary-pink)" }}>
          🏆 Leaderboard
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
          <thead>
            <tr style={{ background: "var(--primary-pink)", color: "white" }}>
              <th style={{ padding: "12px" }}>Rank</th>
              <th style={{ padding: "12px" }}>Name</th>
              <th style={{ padding: "12px" }}>Roll No</th>
              <th style={{ padding: "12px" }}>Total</th>
              <th style={{ padding: "12px" }}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((student, index) => (
              <tr key={student.student._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                </td>
                <td style={{ padding: "10px" }}>{student.student.name}</td>
                <td style={{ padding: "10px" }}>{student.student.rollNumber}</td>
                <td style={{ padding: "10px" }}>{student.totalObtained}/{student.totalMax}</td>
                <td style={{ padding: "10px" }}>{student.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
