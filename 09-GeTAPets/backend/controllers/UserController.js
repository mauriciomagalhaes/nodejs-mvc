const User = require('../models/User');

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
    }
    
}