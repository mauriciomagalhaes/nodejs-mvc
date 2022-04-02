// load module express
const router = require('express').Router();

// Instantiate the controller
const PetController = require('../controllers/PetController');

// Middleware
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload');

// Routes
router.post('/create', verifyToken, imageUpload.array('image'), PetController.create);
router.get('/', PetController.getAll);
router.get('/mypets', verifyToken, PetController.getAllUserPets);

module.exports = router;