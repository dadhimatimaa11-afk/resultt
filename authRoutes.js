import express from "express";
import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";  // User model import

const router = express.Router();

// ✅ Register Route
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // create new user
    const user = new User({ email, role });

    // set hashed password
    await user.setPassword(password);

    // save user
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // verify password
    const valid = await user.verifyPassword(password);
    if (!valid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate JWT token
    const token = jwt.sign(
      { uid: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

