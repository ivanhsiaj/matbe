const Admin = require('../models/Admin');
const Material = require('../models/Material');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');
const Discharge = require('../models/Discharge');
exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const admin = await Admin.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
  });

  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await Admin.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    username,
    email,
    password: hashedPassword,
  });

  await admin.save();
  res.status(201).json({ message: 'Admin created successfully' });
};
exports.getAllMaterials = async (req, res) => {
  const materials = await Material.find().populate('employee', 'name');
  console.log("materials",materials);
  res.json(materials);
};

exports.updateMaterial = async (req, res) => {
  const { id } = req.params;
  const updated = await Material.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteMaterial = async (req, res) => {
  const { id } = req.params;
  await Material.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};


// Employee controller methods
exports.createEmployee = async (req, res) => {
  const { name, email, address, role, shiftAssigned } = req.body;

  const employee = new Employee({
    name,
    email: email || '',
    address,
    role,
    shiftAssigned
  });

  await employee.save();
  res.status(201).json(employee);
};

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updated = await Employee.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};

exports.getAllDischarges = async (req, res) => {
  try {
    const discharges = await Discharge.find()
      .populate('employee', 'name')
      .populate('materialEntry', 'totalWeight timestamp materials');
      console.log(discharges)
    res.json(discharges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get discharges' });
  }
};
