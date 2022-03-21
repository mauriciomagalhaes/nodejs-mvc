const express = require('express');
const router = express.Router();
const ToughtController = require('../controllers/ToughtsController');

// Helpers
// MIdleware authensicated
const checkAuth = require('../helpers/auth').chekAuth;

// Controller
router.get('/add', checkAuth, ToughtController.createTought);
router.post('/add', checkAuth, ToughtController.createToughtSave);
router.get('/edit/:id', checkAuth, ToughtController.updateTought);
router.post('/edit', checkAuth, ToughtController.updateToughtSave);
router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.post('/remove', checkAuth, ToughtController.removeTought);
router.get('/', ToughtController.showToughts);

module.exports = router;