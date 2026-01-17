import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Subjects() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ subjectName: "", subjectCode: "", maxMarks: 100 });
  const [error, setError] = useState("");

  const load = async () => {
    const { data } = await api.get("/subjects");
    setList(data);
  };

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/subjects", form);
      setForm({ subjectName: "", subjectCode: "", maxMarks: 100 });
      await load();
    } catch (err) {
      setError(err.response?.data?.error || "Add failed");
    }
  };

  const remove = async (id) => {
    await api.delete(`/subjects/${id}`);
    await load();
  };

  return (
    <div style={{
      background: "var(--light-pink)",   // variable-based background
      minHeight: "100vh",
      fontFamily: "'Poppins', sans-serif",
      padding: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      color: "var(--text-color)"         // variable-based text color
    }}>
      <div style={{
        width: "100%",
        maxWidth: "800px",
        background: "var(--card-bg)",    // card background variable
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        padding: "30px"
      }}>
        <h3 style={{ textAlign: "center", marginBottom: "20px", color: "var(--primary-pink)", fontWeight: "600" }}>
          📚 Subjects
        </h3>

        <form onSubmit={add} style={{ display: "grid", gap: "12px", maxWidth: 500, margin: "0 auto 30px" }}>
          <input
            placeholder="Subject Name"
            value={form.subjectName}
            onChange={(e)=>setForm({ ...form, subjectName: e.target.value })}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
          />
          <input
            placeholder="Subject Code"
            value={form.subjectCode}
            onChange={(e)=>setForm({ ...form, subjectCode: e.target.value })}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
          />
          <input
            type="number"
            placeholder="Max Marks"
            value={form.maxMarks}
            onChange={(e)=>setForm({ ...form, maxMarks: Number(e.target.value) })}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
          />
          <button type="submit" style={{
            padding: "12px",
            background: "var(--primary-pink)", // pink accent variable
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer"
          }}>
            Add
          </button>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        </form>

        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "15px"
        }}>
          <thead>
            <tr style={{ background: "var(--primary-pink)", color: "white" }}>
              <th style={{ padding: "12px" }}>Name</th>
              <th style={{ padding: "12px" }}>Code</th>
              <th style={{ padding: "12px" }}>Max</th>
              <th style={{ padding: "12px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map(s => (
              <tr key={s._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{s.subjectName}</td>
                <td style={{ padding: "10px" }}>{s.subjectCode}</td>
                <td style={{ padding: "10px" }}>{s.maxMarks}</td>
                <td style={{ padding: "10px" }}>
                  <button onClick={() => remove(s._id)} style={{
                    background: "var(--primary-pink)", // delete button accent
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer"
                  }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
