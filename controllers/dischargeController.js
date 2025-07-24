const Discharge = require('../models/Discharge');
const Material = require('../models/Material');
const Employee  =require('../models/Employee');
// 📌 Steel / Slag - simple
exports.addDischarge = async (req, res) => {
  try {
    const { employeeId, itemType, furnaceSize ,shift} = req.body;

    const discharge = new Discharge({
        shift,
      employee: employeeId,
      itemType,
      weight:req.body?.weight, // optional for steel/slag
      furnaceSize

    });

    await discharge.save();
    res.status(201).json(discharge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 📌 Get possible input for Sow
exports.getPossibleSowInputs = async (req, res) => {
  try {
    const { furnaceSize } = req.query;

    const oneHourAgo = new Date(Date.now() - 75 * 60000); // 1hr 15min ago

    const entries = await Material.find({
      furnaceSize,
      outputStatus: false,
      timestamp: { $lte: new Date(), $gte: oneHourAgo }
    }).sort({ timestamp: 1 }).populate('employee', 'name');; // oldest first

    const preferredId = entries.length ? entries[0]._id : null;
    console.log(entries);
    res.json({
      preferred: preferredId,
      inputs: entries
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 📌 Confirm Sow
exports.addSow = async (req, res) => {
  try {
    const { employeeId, inputId,furnaceSize,shift} = req.body;

    const inputEntry = await Material.findById(inputId);
    if (!inputEntry) {
      return res.status(404).json({ message: 'Input not found' });
    }
    
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Get first 2 letters of employee name
    const empInitials = employee.name.trim().substring(0, 2).toUpperCase();
    // Default to 33% if no manual weight
    const sowWeight = req.body?.weight || Math.round(inputEntry.totalWeight * 0.33);

    // Generate sowId: MMYYCount
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);

    // Count sows this emp this month
    const sowCount = await Discharge.countDocuments({
      employee: employeeId,
      itemType: 'sow',
      timestamp: {
        $gte: new Date(now.getFullYear(), now.getMonth(), 1),
        $lt: new Date(now.getFullYear(), now.getMonth() + 1, 1)
      }
    });

   
    const sowSerial = `${mm}${yy}${sowCount + 1}`;

    const sowId = `SOW-${empInitials}-${sowSerial}`;
    const discharge = new Discharge({
        shift,
      employee: employeeId,
      itemType: 'sow',
      weight: sowWeight,
      sowId,
      materialEntry: inputId,
      furnaceSize
    });

    await discharge.save();

    // Mark input status
    inputEntry.outputStatus = true;
    await inputEntry.save();

    res.status(201).json(discharge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
