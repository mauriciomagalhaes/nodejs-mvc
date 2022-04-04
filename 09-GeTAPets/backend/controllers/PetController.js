// Instance model: Pet
const Pet = require('../models/Pet');

// Middleware
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PetController{

    //Create a pet
    static async create(req, res){
        
        const { name, age,  weight, color } = req.body;

        const available = true;

        const images = req.files
        //console.log(image)

        if(!name){
            return res.status(422).json({ message: 'Nome do pet é obrigatório' });
        }
        if(!age){
            return res.status(422).json({ message: 'A idade do pet é obrigatória' });
        }
        if(!weight){
            return res.status(422).json({ message: 'O peso do pet é obrigatório' });
        }
        if(!color){
            return res.status(422).json({ message: 'A cor do pet é obrigatória' });
        }
        if(images.length === 0){
            return res.status(422).json({ message: 'A imagem do pet é obrigatória' });
        }

        const token = getToken(req);
        const user = await getUserByToken(token);
        
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        });

        images.map(images => {
            pet.images.push(images.filename);
        });

        try {
            const newPet = await pet.save();
            res.status(201).json({ message: 'Pet criado com sucesso', newPet });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar pet' });
        }
    }
    
    static async getAll(req, res){
        const pets = await Pet.find();
        res.status(200).json({ pets });
    }

    static async getAllUserPets(req, res){
        // Get user token
        const token = getToken(req);
        const user = await getUserByToken(token);
        // Get pets by user
        const pets = await Pet.find({'user._id': user._id }).sort('-createdAt');
        res.status(200).json({ pets });
    }

    static async getAllUserAdoptions(req, res){
        // Get user token
        const token = getToken(req);
        const user = await getUserByToken(token);
        // Get pets by user
        const pets = await Pet.find({'adopter._id': user._id }).sort('-createdAt');
        res.status(200).json({ pets });
    }
    
    static async getPetById(req, res){
        const { id } = req.params;
        // Verify if id is valid
        if(!ObjectId.isValid(id)){
            return res.status(422).json({ message: 'Id não encontrado' });
        }
        //Get pet by id
        const pet = await Pet.findOne({_id: id});

        // If pet exists
        if(!pet){
            return res.status(422).json({ message: 'Pet não encontrado' });
        }
        res.status(200).json({ pet: pet, });
    }

    static async removePetById(req, res){
        const { id } = req.params;
        // Verify if id is valid  
        if(!ObjectId.isValid(id)){
            return res.status(422).json({ message: 'Id inválido ' });
        }
        // Get pet by id
        const pet = await Pet.findOne({_id: id})
        // If pet exists
        if(!pet){
            return res.status(422).json({ message: 'Pet não encontrado' })
        }
        // Get user token	
        const token = await getToken(req);
        // Get user by token
        const user = await getUserByToken(token)

        //If Pet pertence to user 
        if(pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({ message: 'Pet não encontrado ou não pertence ao usuário' })
        }

        // Find and remove pet
        await Pet.findByIdAndRemove(id)

        res.status(200).json({message: 'Pet removido com sucesso'})
    } 
    static async updatePet(req, res){
        const { id } = req.params;
        const { name, age,  weight, color, available } = req.body;
        const images = req.files
        // Object update
        const updateData = {}
        // Verify if id is valid  
        if(!ObjectId.isValid(id)){
            return res.status(422).json({ message: 'Id inválido ' });
        }
        // Get pet by id
        const pet = await Pet.findOne({_id: id})
        // If pet exists
        if(!pet){
            return res.status(422).json({ message: 'Pet não encontrado' })
        }
        // Validate inputs
        if(!name){
            return res.status(422).json({ message: 'Nome do pet é obrigatório' });
        }else{
            updateData.name = name
        }
        if(!age){
            return res.status(422).json({ message: 'A idade do pet é obrigatória' });
        }else{
            updateData.age = age
        }
        if(!weight){
            return res.status(422).json({ message: 'O peso do pet é obrigatório' });
        }else{
            updateData.weight = weight
        }
        if(!color){
            return res.status(422).json({ message: 'A cor do pet é obrigatória' });
        }else{
            updateData.color = color
        }
        if(images.length === 0){
            return res.status(422).json({ message: 'A imagem do pet é obrigatória' });
        }else{
            updateData.images = [];
            images.map((image) => {
                updateData.images.push(image.filename)
            })
        }
        // Update by id a pet
        await Pet.findByIdAndUpdate(id, updateData)
        return res.status(200).json({message: 'Pet atualizado com sucesso!' })
    }

}