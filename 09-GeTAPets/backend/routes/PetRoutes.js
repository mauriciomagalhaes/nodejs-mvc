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
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions);
router.get('/:id', PetController.getPetById);
router.delete('/:id', verifyToken, PetController.removePetById);
router.patch('/:id', verifyToken, imageUpload.array('image'), PetController.updatePet);
router.patch('/schedule/:id', verifyToken, PetController.schedule);
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)
//myadoptions
module.exports = router;