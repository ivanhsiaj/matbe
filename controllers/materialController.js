// const Material = require('../models/Material');

// exports.addMaterial = async (req, res) => {
//   const {
//     materialName,
//     materialType,
//     weights,
//     weight,
//     quantity,
//     shift
//   } = req.body;

//   const material = new Material({
//     materialName,
//     materialType,
//     weights,
//     weight,
//     quantity,
//     shift
//   });

//   await material.save();
//   res.status(201).json(material);
// };
// controllers/materialController.js

const Material = require('../models/Material');

exports.addMaterial = async (req, res) => {
 try {
    const {
      shift,
      furnaceSize, // 👈 add this in request
      employeeId,
      materials,
      totalWeight
    } = req.body;

    const material = new Material({
      shift,
      furnaceSize, // 👈 add this in DB
      employee: employeeId,
      materials,
      totalWeight,
      outputStatus: false // 👈 always false at creation
    });

    await material.save();
    res.status(201).json(material);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add material entry' });
  }
};
