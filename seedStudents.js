import mongoose from "mongoose";
import Student from "../Model/studentModel.js"; // 👈 path सही रखो

const run = async () => {
  try {
    // ✅ पुराने options हटाओ
    await mongoose.connect("mongodb://localhost:27017/yourDB");

    console.log("✅ Database connected");

    const students = [];

    for (let i = 1; i <= 100; i++) {
      students.push({
        name: `Student ${i}`,
        rollNumber: `${1000 + i}`,
        classOrCourse: "B.Sc",
        email: `student${i}@example.com`,
      });
    }

    await Student.insertMany(students);
    console.log("✅ 100 students inserted successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Error inserting students:", err.message);
    process.exit(1);
  }
};

run();
