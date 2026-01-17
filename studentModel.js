
import mongoose from 'mongoose';




const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: String, required: true },
  classOrCourse: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
