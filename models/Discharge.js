const mongoose = require('mongoose');

const dischargeSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    timestamp: { type: Date, default: Date.now },
    itemType: {
        type: String,
        enum: ['steel', 'slag', 'sow'],
        required: true
    },
    weight: { type: Number }, // optional for steel/slag
    sowId: { type: String },  // only for sow
    materialEntry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material'
    },
    furnaceSize: {
        type: String,
        enum: ['big', 'small'],
        required: true
    },
    shift: { type: String, required: true }
}
);

module.exports = mongoose.model('Discharge', dischargeSchema);
