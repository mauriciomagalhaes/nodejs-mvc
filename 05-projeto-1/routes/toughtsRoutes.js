const express = require('express');
const router = express.Router();
const ToughtController = require('../controllers/ToughtsController');

// Helpers
const checkAuth = require('../helpers/auth').chekAuth;

// Controller
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.get('/', ToughtController.showToughts);

module.exports = router;