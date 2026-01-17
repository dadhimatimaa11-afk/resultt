const Course = require('../Model/subjectModel.js');

// Create Teach

exports.createSubject
 = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  }
 catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Teach
exports.getCourse = async (req, res) => {
  const course = await Student.find();
  res.json(course);
};



// Get Teach by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.filterByAge = async (req, res) => {

  const min = parseInt(req.query.minAge);
  const max = parseInt(req.query.maxAge);

  try {
    const course = await Course.find({ age: { $gte: min, $lte: max } });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.countCourse = async (req, res) => {
  try {
    const count = await Course.countDocuments();
    res.json({ totalCourse: count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.searchByName = async (req, res) => {
  const keyword = req.query.name;
  try {
    const course = await Course.find({ name: { $regex: keyword, $options: 'i' }});
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.filterBySalary = async (req, res) => {

  const min = parseInt(req.query.minSalary);
  const max = parseInt(req.query.maxSalary);

  try {
    const course = await course.find({ Salary: { $gte: min, $lte: max } });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};









exports.sortCourse = async (req, res) => {
  const field = req.query.field || 'name';   
const order = req.query.order === 'desc' ? -1 : 1;       // 'desc' gives -1, otherwise 1 (asc)

  try {
    const course = await Course.find().sort({ [field]: order }); // Dynamic sort
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.sortCourse = async (req, res) => {
  const field = req.query.field || 'age';   
const order = req.query.order === 'desc' ? -1 : 1;       // 'desc' gives -1, otherwise 1 (asc)

  try {
    const course = await Course.find().sort({ [field]: order }); // Dynamic sort
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.sortCourse = async (req, res) => {
  const field = req.query.field || 'salary';   
const order = req.query.order === 'desc' ? -1 : 1;       // 'desc' gives -1, otherwise 1 (asc)

  try {
    const course = await Course.find().sort({ [field]: order }); // Dynamic sort
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.paginateCourse = async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  try {
    const course= await Course.find().skip(skip).limit(limit);
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Update Teach
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Teach
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.filterByActive = async (req, res) => {

  const active = parseInt(req.query.active);
  const inactive = parseInt(req.query.inactive);

  try {
    const course = await Course.find({ Salary: { $gte: active, $lte: inactive} });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};