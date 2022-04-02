const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class UserController{
    static async register(req, res){
        const { name, email, phone, password, confirmpassword } = req.body;
        // Validate data
        if(!name){
            return res.status(422).json({message: 'O nome é obrigatório!'});
        }
        if(!email){
            return res.status(422).json({message: 'O email é obrigatório!'});
        }else{
            if(!email.includes('@')){
                return res.status(422).json({message: 'O email não é válido!'});
            }
        }
        if(!phone){
            return res.status(422).json({message: 'O telefone é obrigatório!'});
        }
        if(!password){
            return res.status(422).json({message: 'A senha é obrigatória!'});
        }
        if(!confirmpassword){
            return res.status(422).json({message: 'A confirmação de senha é obrigatória!'});
        }
        if(password !== confirmpassword){
            return res.status(422).json({message: 'As senhas não conferem!'});
        }
        // Check if email already exists
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(422).json({message: 'Email já cadastrado!'}); 
        }
        // Create a password hash
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({name, email, phone, password: passwordHash});
        try {
            const newUser = await user.save();
            await createUserToken(newUser, req, res);
        } catch (error) {
            return res.status(500).json({message: 'Erro ao criar o usuário!'});
        }
            
    }
    // Login
    static async login(req, res){
        const { email, password } = req.body;

        // Validate data
        if(!email){
            return res.status(422).json({message: 'O email é obrigatório!'});
        }else{
            if(!email.includes('@')){
                return res.status(422).json({message: 'O email não é válido!'});
            }
        }
        if(!password){
            return res.status(422).json({message: 'A senha é obrigatória!'});
        }
       
        // Check if email already exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(422).json({message: 'Email não cadastrado!'}); 
        }

        // Check if password is correct
        const CheckPassword = await bcrypt.compare(password, user.password);
        if(!CheckPassword){
            return res.status(422).json({message: 'Senha incorreta!'});
        }
    await createUserToken(user, req, res);
    }

    //Check User
    static async checkUser(req, res){
        let currentUser
        //console.log(req.headers.authorization)
        if(req.headers.authorization){
            const token = getToken(req);
            const decoded = jwt.verify(token, 'nossosupersecreto')

            currentUser = await User.findById(decoded.id);
            currentUser.password = undefined;

        }else{
            currentUser = null;
        }
        res.status(200).send({currentUser});
    }

    // Get User by Id
    static async getUserById(req, res){
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            return res.status(422).json({message: 'Usuário não encontrado!'});
        }
        //user.password = undefined;
        res.status(200).json({user});
    }

    // Get User by Id
    static async editUser(req, res){
        const  { name, email, phone, password, confirmpassword } = req.body;

        // Get user auth by token
        const user = await getUserByToken(getToken(req));
        console.log(user)

        let image = ''

        if(req.file){
            image = req.file.filename
        }

        // Validate data
        if(!name){
            return res.status(422).json({message: 'O nome é obrigatório!'});
        }

        //user.name = name;

        if(!email){
            return res.status(422).json({message: 'O email é obrigatório!'});
        }

        // check if email already exists
        const userExist = await User.findOne({email:email});

        if(user.email !== email && userExist){
            return res.status(422).json({message: 'Favor utilizar outro email!'});
        }

        user.email = email

        if(!phone){
            return res.status(422).json({message: 'O telefone é obrigatório!'});
        }

        user.phone = phone

        if(password != confirmpassword){
            return res.status(422).json({message: 'As senhas não conferem!'});
        } else if (password === confirmpassword && password !== null){
            // Create a password hash
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash
        }
        try {
            // Return user updated data
            await User.findOneAndUpdate(
                { _id: user._id }, 
                { $set: user },
                { new: true },
            );
            res.status(200).json({message: 'Usuário atualizado com sucesso!'});

        } catch (error) {
            return res.status(500).json({message: `error: ${error}`});	
        }
    }
}

