const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');

router.post('/signup', adminController.signup);

// ✅ Login route for Admin (username or email)
router.post('/login', adminController.login);


// router.get('/materials', auth, adminController.getAllMaterials);
router.put('/materials/:id', auth, adminController.updateMaterial);
router.delete('/materials/:id', auth, adminController.deleteMaterial);
// router.get(
//   "/materialsByMonth",
//   auth,
//   adminController.getMaterialsByMonth
// );

// // POST materials with filters (for filtered search and pagination)
// router.post(
//   "filterMaterials",
//   auth,
//   adminController.filterMaterials
// );
router.get("/allmaterials", adminController.getAllMaterials);
router.post("/filter-materials", adminController.filterMaterials);
// Employees
router.post('/employees', auth, adminController.createEmployee);
router.get('/employees', auth, adminController.getAllEmployees);
router.put('/employees/:id', auth, adminController.updateEmployee);
router.delete('/employees/:id', auth, adminController.deleteEmployee);

router.get("/discharges", auth,adminController.getAllDischarges);
router.post("/filter-discharges",auth, adminController.filterDischarges);
// Change password API
router.post('/change-password',adminController.changePassword);

module.exports = router;
module.exports = router;
