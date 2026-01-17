// Routes/pdf.js
import express from "express";
import PDFDocument from "pdfkit";
import Result from "../Model/resultModel.js";
import Student from "../Model/studentModel.js";

const router = express.Router();

router.get("/download/:rollNumber", async (req, res) => {
  try {
    // Step 1: Student find
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) return res.status(404).send("Student not found");

    // Step 2: Results find
    const results = await Result.find({ student: student._id })
      .populate("student")
      .populate("subject");

    if (!results || results.length === 0) return res.status(404).send("Result not found");

    // Step 3: PDF generate
    const doc = new PDFDocument({ margin: 30 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=result-${student.rollNumber}.pdf`);
    doc.pipe(res);

    // 🎓 Header
    doc.fontSize(20).text("Student Marksheet", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${student.name}`);
    doc.text(`Roll No: ${student.rollNumber}`);
    doc.text(`Course: ${student.classOrCourse}`);
    doc.moveDown();

    // 📊 Table Header
    const tableTop = doc.y;
    const col1 = 50, col2 = 250, col3 = 400;
    doc.fontSize(12).text("Subject", col1, tableTop);
    doc.text("Marks Obtained", col2, tableTop);
    doc.text("Max Marks", col3, tableTop);
    doc.moveDown();

    // 📊 Table Rows
    let totalObtained = 0, totalMax = 0;
    results.forEach((r, i) => {
      const y = tableTop + 25 + i * 20;
      doc.text(r.subject.subjectName, col1, y);
      doc.text(r.marksObtained.toString(), col2, y);
      doc.text(r.subject.maxMarks.toString(), col3, y);

      totalObtained += r.marksObtained;
      totalMax += r.subject.maxMarks;
    });

    doc.moveDown(2);
    const percentage = Math.round((totalObtained / totalMax) * 100);
    doc.fontSize(14).text(`Total: ${totalObtained}/${totalMax}`);
    doc.text(`Percentage: ${percentage}%`);

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
