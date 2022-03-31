// load module express
const router = require('express').Router();

// Instantiate the controller
const PetController = require('../controllers/PetController');

// Middleware
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload');

// Route to create a pet
router.post('/create', verifyToken, imageUpload.array('image'), PetController.create);

module.exports = router;