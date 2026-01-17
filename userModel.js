import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true,lowercase: true },
  passwordHash: { type: String, required: true }, 
  role: { type: String, enum: ['admin', 'student'], required: true },
  linkedStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

// Method to set password
userSchema.methods.setPassword = async function (plain) {
  this.passwordHash = await bcrypt.hash(plain, 10);
};

// Method to verify password
userSchema.methods.verifyPassword = async function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

export default mongoose.model('User', userSchema);
