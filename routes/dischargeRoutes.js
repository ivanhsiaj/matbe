const express = require('express');
const router = express.Router();
const dischargeController = require('../controllers/dischargeController');

router.post('/', dischargeController.addDischarge);
router.get('/possible-sows', dischargeController.getPossibleSowInputs);
router.post('/sow', dischargeController.addSow);

module.exports = router;
