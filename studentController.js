const Student = require('../Model/studentModel.js');

// Create Teach

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  }
 catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Teach
exports.getStudent = async (req, res) => {
  const student = await Student.find();
  res.json(student);
};



// Get Teach by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.filterByAge = async (req, res) => {

  const min = parseInt(req.query.minAge);
  const max = parseInt(req.query.maxAge);

  try {
    const student = await Student.find({ age: { $gte: min, $lte: max } });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.countStudent = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ totalStudent: count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.searchByName = async (req, res) => {
  const keyword = req.query.name;
  try {
    const student = await Student.find({ name: { $regex: keyword, $options: 'i' }});
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.filterBySalary = async (req, res) => {

  const min = parseInt(req.query.minSalary);
  const max = parseInt(req.query.maxSalary);

  try {
    const student = await Student.find({ Salary: { $gte: min, $lte: max } });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};









exports.sortCourse = async (req, res) => {
  const field = req.query.field || 'name';   
const order = req.query.order === 'desc' ? -1 : 1;       // 'desc' gives -1, otherwise 1 (asc)

  try {
    const student = await Student.find().sort({ [field]: order }); // Dynamic sort
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.sortStudent = async (req, res) => {
  const field = req.query.field || 'age';   
const order = req.query.order === 'desc' ? -1 : 1;       // 'desc' gives -1, otherwise 1 (asc)

  try {
    const student = await Student.find().sort({ [field]: order }); // Dynamic sort
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.sortStudent = async (req, res) => {
  const field = req.query.field || 'salary';   
const order = req.query.order === 'desc' ? -1 : 1;       // 'desc' gives -1, otherwise 1 (asc)

  try {
    const student = await Student.find().sort({ [field]: order }); // Dynamic sort
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.paginateStudent = async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  try {
    const student= await Student.find().skip(skip).limit(limit);
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Update Teach
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Teach
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.filterByActive = async (req, res) => {

  const active = parseInt(req.query.active);
  const inactive = parseInt(req.query.inactive);

  try {
    const student = await Student.find({ Salary: { $gte: active, $lte: inactive} });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};