// const mongoose = require('mongoose');

// const materialSchema = new mongoose.Schema({
//   materialName: { type: String, required: true },
//   materialType: { type: String, required: true },
//   weights: [{ type: Number }], // For different weights option
//   weight: { type: Number },    // For same weight option
//   quantity: { type: Number, required: true },
//   shift: { type: String, enum: ['Shift 1', 'Shift 2', 'Shift 3'], required: true },
//   timestamp: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Material', materialSchema);

// models/Material.js

const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  shift: { type: String, required: true },
  furnaceSize: { 
    type: String, 
    enum: ['big', 'small'], 
    required: true 
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  timestamp: { type: Date, default: Date.now },
  materials: [
    {
      materialType: { type: String, required: true },
      size: { type: String, required: true },
      count: { type: Number, required: true },
      weightPerItem: { type: Number, required: true }
    }
  ],
  totalWeight: { type: Number, required: true },
  outputStatus: { type: Boolean, default: false }
});

module.exports = mongoose.model('Material', materialSchema);
