
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  marksObtained: { type: Number, required: true, min: 0 },
  examName: { type: String, required: true, trim: true },
  resultStatus: { type: String, enum: ['published', 'unpublished'], default: 'unpublished' }
}, { timestamps: true });

// Avoid duplicate subject results per student per exam
resultSchema.index({ student: 1, subject: 1, examName: 1 }, { unique: true });

export default mongoose.model('Result', resultSchema);
