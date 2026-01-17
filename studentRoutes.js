// routes/students.js
import express from "express";
import { requireAuth, requireRole } from "../Middleware/authMiddleware.js";
import Student from "../Model/studentModel.js";

const router = express.Router();

/**
 * @route   POST /api/students
 * @desc    Create single student (Admin only)
 */
router.post("/", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   POST /api/students/bulk
 * @desc    Bulk insert students (Admin only)
 */
router.post("/bulk", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const { students } = req.body;
    if (!students || !Array.isArray(students)) {
      return res.status(400).json({ error: "Students array is required" });
    }

    const inserted = await Student.insertMany(students);
    res.status(201).json({
      message: "✅ Students inserted successfully",
      count: inserted.length,
      data: inserted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /api/students
 * @desc    Get all students (Admin only)
 */
router.get("/", requireAuth, requireRole("admin"), async (_req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /api/students/:id
 * @desc    Get student by ID (Admin only)
 */
router.get("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   PUT /api/students/:id
 * @desc    Update student (Admin only)
 */
router.put("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete student (Admin only)
 */
router.delete("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "✅ Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
