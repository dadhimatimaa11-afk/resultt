import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get("/results"); 
        // 👆 यह API backend से सारे students + subjects + marks लाएगी
        setStudents(data);
      } catch (err) {
        setError("Failed to load students");
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">📊 All Students Results</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-100">
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Roll No</th>
              <th className="border px-3 py-2">Course</th>
              <th className="border px-3 py-2">Exam</th>
              <th className="border px-3 py-2">Subjects & Marks</th>
              <th className="border px-3 py-2">Total</th>
              <th className="border px-3 py-2">Percentage</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i} className="hover:bg-pink-50">
                <td className="border px-3 py-2">{s.student?.name}</td>
                <td className="border px-3 py-2">{s.student?.rollNumber}</td>
                <td className="border px-3 py-2">{s.student?.classOrCourse}</td>
                <td className="border px-3 py-2">{s.examName}</td>
                <td className="border px-3 py-2">
                  {s.results?.map((r, j) => (
                    <div key={j}>
                      {r.subject.subjectName}: {r.marksObtained}/{r.subject.maxMarks}
                    </div>
                  ))}
                </td>
                <td className="border px-3 py-2">{s.totalObtained}/{s.totalMax}</td>
                <td className="border px-3 py-2">{s.percentage}%</td>
                <td className="border px-3 py-2">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
