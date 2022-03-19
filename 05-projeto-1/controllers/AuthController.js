// Models
const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController{

    static login(req, res){
        res.render('auth/login');
    }

    static register(req, res){
        res.render('auth/register');
    }

    static async registerPost(req, res){
        const { name, email, password, confirmpassword } = req.body;

        //Check passwords
        if(password !== confirmpassword){
            req.flash('message', 'As senhas não são iguais!');
            res.render('auth/register');
            
            return;
        }
        // Check if e-mail already exists
        const checkIfUserExists = await User.findOne({where: {email: email}});

        if(checkIfUserExists){
            req.flash('message', 'E-mail já existe!');
            res.render('auth/register');
            
            return;
        }

        // Create a password
        const salt =  bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = { name, email, password: hashPassword };
        try {
            // Create a user on bd
            const createUser = await User.create(user);
            // Initialize session
            req.session.userid = createUser.id;
            // Message
            req.flash('message', 'Usuário criado com sucesso!');
            // Save user in session
            req.session.save(() => {
                res.redirect('/');
            })
            
        } catch(err){
            console.log(err);
        }
    }
    
    static async logout(req, res){
        req.session.destroy(() => {
            res.redirect('/');
        })
    }
    
}