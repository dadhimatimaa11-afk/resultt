// routes/results.js
import express from 'express';
import { requireAuth, requireRole } from '../Middleware/authMiddleware.js';
import Result from '../Model/resultModel.js';
import Student from '../Model/studentModel.js';
import Subject from '../Model/subjectModel.js';
import { computeTotals } from '../utils/computeUtils.js';

const router = express.Router();

// =======================
// POST /api/results (Admin)
// =======================
router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { student, subject, marksObtained, examName } = req.body;

    const subj = await Subject.findById(subject);
    if (!subj) return res.status(404).json({ error: 'Subject not found' });

    if (marksObtained > subj.maxMarks) {
      return res.status(400).json({ error: 'Marks cannot exceed maxMarks' });
    }

    // ✅ Prevent duplicate entry for same student+subject+exam
    const existing = await Result.findOne({ student, subject, examName });
    if (existing) {
      return res.status(400).json({ error: 'Result already exists for this subject & exam' });
    }

    const result = await Result.create({ student, subject, marksObtained, examName, resultStatus: 'published' });
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// =======================
// POST /api/results/bulk (Admin) - add multiple results at once
// =======================
router.post('/bulk', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const resultsArray = req.body.results;
    if (!Array.isArray(resultsArray)) {
      return res.status(400).json({ error: 'Results must be an array' });
    }

    for (const r of resultsArray) {
      const subj = await Subject.findById(r.subject);
      if (!subj) return res.status(404).json({ error: `Subject not found for ${r.subject}` });
      if (r.marksObtained > subj.maxMarks) {
        return res.status(400).json({ error: `Marks exceed maxMarks for ${subj.subjectName}` });
      }
    }

    const inserted = await Result.insertMany(resultsArray);
    res.status(201).json({ message: 'Bulk results added', count: inserted.length });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// =======================
// PUT /api/results/:id (Admin)
// =======================
router.put('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const updated = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Result not found' });

    if (req.body.marksObtained && updated.subject) {
      const subj = await Subject.findById(updated.subject);
      if (req.body.marksObtained > subj.maxMarks) {
        return res.status(400).json({ error: 'Marks cannot exceed maxMarks' });
      }
    }

    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// =======================
// DELETE /api/results/:id (Admin)
// =======================
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const deleted = await Result.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Result not found' });
    res.json({ message: 'Result deleted successfully' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// =======================
// GET /api/results/:rollNumber (Student)
// =======================
router.get('/:rollNumber', async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const { examName } = req.query;

    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const query = { student: student._id };
    if (examName) query.examName = examName;

    const results = await Result.find(query).populate('subject', 'subjectName subjectCode maxMarks');
    if (!results.length) return res.status(404).json({ error: 'No results found' });

    const calc = computeTotals(results);

    res.json({
      student: {
        name: student.name,
        rollNumber: student.rollNumber,
        classOrCourse: student.classOrCourse
      },
      examName: examName || 'All Published',
      subjects: results.map(r => ({
        subjectName: r.subject.subjectName,
        subjectCode: r.subject.subjectCode,
        maxMarks: r.subject.maxMarks,
        marksObtained: r.marksObtained
      })),
      totalObtained: calc.totalObtained,
      totalMax: calc.totalMax,
      percentage: calc.percentage,
      status: calc.status,
      grade: calc.grade
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// =======================
// GET /api/results (Admin) - consolidated for all students
// =======================
router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const results = await Result.find()
      .populate('student', 'name rollNumber classOrCourse')
      .populate('subject', 'subjectName maxMarks');

    const grouped = {};

    results.forEach(r => {
      const sid = r.student._id.toString();
      if (!grouped[sid]) {
        grouped[sid] = {
          student: r.student,
          examName: r.examName,
          results: [],
          totalObtained: 0,
          totalMax: 0,
          percentage: 0,
          status: ''
        };
      }
      grouped[sid].results.push(r);
      grouped[sid].totalObtained += r.marksObtained;
      grouped[sid].totalMax += r.subject.maxMarks;
    });

    Object.values(grouped).forEach(s => {
      s.percentage = ((s.totalObtained / s.totalMax) * 100).toFixed(2);
      s.status = s.percentage >= 33 ? 'Pass' : 'Fail';
    });

    res.json(Object.values(grouped));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
