// models/Subject.js
import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true, trim: true },
  subjectCode: { type: String, required: true, trim: true},
  maxMarks: { type: Number, required: true, min: 1 }
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);
