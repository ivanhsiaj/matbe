// models/Employee.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: '' }, // optional
  address: { type: String, required: true },
  role: { type: String, required: true },
  shiftAssigned: { type: String, required: true } // e.g. "Shift 1"
});

module.exports = mongoose.model('Employee', employeeSchema);
