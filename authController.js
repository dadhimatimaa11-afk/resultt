
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const studentModel = require('../Model/studentModel.js');

const JWT_SECRET = "$RH0976yetrdthyjukmgfctu7ugU70Q";

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const Student = await Student.create({ name, email, password: hashedPassword, age });

    res.status(201).json({ message: "Registered successfully", studentId: studentModel._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



