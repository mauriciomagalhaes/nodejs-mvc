const express = require('express');
const router = express.Router();
const ToughtController = require('../controllers/ToughtsController');
// Controller
router.get('/dashboard', ToughtController.dashboard);
router.get('/', ToughtController.showToughts);

module.exports = router;