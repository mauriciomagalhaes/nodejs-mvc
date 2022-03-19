const express = require('express');
const router = express.Router();
const ToughtController = require('../controllers/ToughtsController');
// Controller

router.get('/', ToughtController.showToughts);

module.exports = router;