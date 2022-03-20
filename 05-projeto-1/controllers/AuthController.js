// Models
const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController{

    static login(req, res){
        res.render('auth/login');
    }

    static async loginPost(req, res){
        const { email, password } = req.body;
        // Check if e-mail exists
        const user = await User.findOne({where: {email: email}});

        if(!user){
            req.flash('message', 'E-mail não existe!');
            res.render('auth/login');
            return;
        }
        // Check if password is correct
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if(!passwordMatch){
            req.flash('message', 'Senha incorreta!');
            res.render('auth/login');
            return;
        }
        // Initialize session
        req.session.userid = user.id;
        // Message
        req.flash('message', 'Autenticado com sucesso!');
        // Save user in session
        req.session.save(() => {
            res.redirect('/');
        })
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