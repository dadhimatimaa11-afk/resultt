import { useState, useEffect } from "react";
import api from "../services/api.js";
import confetti from "canvas-confetti";   

export default function CheckResult() {
  const [rollNumber, setRollNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");
    setResult(null);
    try {
      const { data } = await api.get(`/results/${rollNumber}`);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || "Result not found");
    }
  };

  // 🎉 Confetti trigger when Pass
  useEffect(() => {
    if (result?.status === "Pass") {
      confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [result]);

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
        width: "100%",
        maxWidth: "600px",
        background: "var(--card-bg)",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        padding: "30px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "var(--primary-pink)" }}>
          🎓 Check Result
        </h2>
        <label style={{ fontWeight: "600", marginBottom: "8px", display: "block" }}>
          Enter Roll Number
        </label>
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="e.g. 103"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "15px"
          }}
        />
        <button onClick={handleCheck} style={{
          width: "100%",
          padding: "12px",
          background: "var(--primary-pink)",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: "600",
          cursor: "pointer"
        }}>
          View
        </button>

        {error && <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>{error}</p>}
        {result && (
          <div style={{
            marginTop: "20px",
            background: "var(--card-bg)",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid var(--primary-pink)"
          }}>
            <p><strong>Name:</strong> {result.student?.name}</p>
            <p><strong>Roll No:</strong> {result.student?.rollNumber}</p>
            <p><strong>Course:</strong> {result.student?.classOrCourse}</p>
            <p><strong>Exam:</strong> {result.examName}</p>
            <p><strong>Status:</strong> {result.status}</p>
            <p><strong>Grade:</strong> {result.grade}</p>
            <p><strong>Percentage:</strong> {result.percentage}%</p>
            <p><strong>Total:</strong> {result.totalObtained} / {result.totalMax}</p>

            {/* ✅ Subjects Table */}
            <h3 style={{ marginTop: "15px", color: "var(--primary-pink)" }}>Subjects & Marks</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr style={{ background: "#fce7f3" }}>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Subject</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Marks Obtained</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Max Marks</th>
                </tr>
              </thead>
              <tbody>
                {result.results?.map((r, i) => (
                  <tr key={i}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.subject.subjectName}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>{r.marksObtained}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>{r.subject.maxMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 📄 Download PDF Button */}
            <a
              href={`http://localhost:5000/api/download/${result.student?.rollNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "15px",
                padding: "10px 20px",
                background: "var(--primary-pink)",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              📄 Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
