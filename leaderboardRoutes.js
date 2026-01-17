import express from "express";
import Result from "../Model/resultModel.js";

const router = express.Router();

router.get("/leaderboard", async (req, res) => {
  try {
    const results = await Result.find({})
      .populate("student")
      .populate("subject");

    const studentMap = {};

    results.forEach(r => {
      // अगर student या subject null है तो skip करो
      if (!r.student || !r.subject) return;

      const roll = r.student.rollNumber;

      if (!studentMap[roll]) {
        studentMap[roll] = {
          student: r.student,
          totalObtained: 0,
          totalMax: 0
        };
      }

      studentMap[roll].totalObtained += r.marksObtained || 0;
      studentMap[roll].totalMax += r.subject?.maxMarks || 0;
    });

    // Array में convert करके percentage निकालो
    const leaderboard = Object.values(studentMap).map(s => ({
      student: s.student,
      totalObtained: s.totalObtained,
      totalMax: s.totalMax,
      percentage: s.totalMax
        ? Math.round((s.totalObtained / s.totalMax) * 100)
        : 0
    }));

    // Sort by percentage (descending)
    leaderboard.sort((a, b) => b.percentage - a.percentage);

    res.json(leaderboard.slice(0, 5));
  } catch (err) {
    console.error("Leaderboard error:", err); // 👈 actual error log
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
