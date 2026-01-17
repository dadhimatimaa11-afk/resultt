// utils/computeUtils.js

// Existing function: compute totals for one student's results
export function computeTotals(results) {
  const totalObtained = results.reduce(
    (sum, r) => sum + (r.marksObtained || 0),
    0
  );

  const totalMax = results.reduce(
    (sum, r) => sum + (r.subject?.maxMarks || 0),
    0
  );

  const percentage = totalMax ? (totalObtained / totalMax) * 100 : 0;
  const status = percentage >= 33 ? "Pass" : "Fail";

  let grade = "N/A";
  if (percentage >= 80) grade = "A";
  else if (percentage >= 60) grade = "B";
  else if (percentage >= 45) grade = "C";
  else if (percentage >= 33) grade = "D";

  return {
    totalObtained,
    totalMax,
    percentage: Math.round(percentage),
    status,
    grade,
  };
}

// ✅ New helper: generate bulk results (dummy data for testing)
export function generateBulkResults(count = 100) {
  const results = [];

  for (let i = 1; i <= count; i++) {
    results.push({
      student: `65f${i.toString().padStart(3, "0")}abc...`,   // 👈 Replace with real Student IDs
      subject: `65g${i.toString().padStart(3, "0")}def...`,   // 👈 Replace with real Subject IDs
      marksObtained: Math.floor(Math.random() * 100),         // Random marks 0–99
      examName: "Final Exam"
    });
  }

  return results;
}
