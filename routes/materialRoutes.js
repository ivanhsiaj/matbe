const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

const adminController = require('../controllers/adminController');
router.post('/', materialController.addMaterial);

router.get('/employees', adminController.getAllEmployees);

module.exports = router;
