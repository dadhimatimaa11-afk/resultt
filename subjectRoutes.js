// routes/subjects.js
import express from 'express';
import { requireAuth, requireRole } from '../Middleware/authMiddleware.js';
import Subject from '../Model/subjectModel.js';

const router = express.Router();

router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', requireAuth, requireRole('admin'), async (_req, res) => {
  const subjects = await Subject.find().sort({ subjectCode: 1 });
  res.json(subjects);
});

router.put('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ message: 'Subject deleted' });
});

export default router;
