// Instance model: Pet
const Pet = require('../models/Pet');

// Middleware
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const match = require('nodemon/lib/monitor/match');

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
            return res.status(201).json({ message: 'Pet criado com sucesso', newPet });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar pet' });
        }
    }

}