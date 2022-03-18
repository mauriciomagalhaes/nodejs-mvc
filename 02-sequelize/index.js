const express = require('express');
const expnbs = require('express-handlebars');
const conn = require('./db/conn');
const path = require('path');

//Models
const User = require('./models/User');
const Address = require('./models/Address');

//express
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.json());

//handlebars
app.engine('handlebars', expnbs.engine());
app.set('view engine', 'handlebars');

// routes
app.get('/users/create', (req, res) => {
    res.render('adduser');
})

app.post('/users/create', async (req, res) => {
    const { name, occupation } = req.body;
    let newsletter = req.body.newsletter;

    if(newsletter === 'on'){
        newsletter = true;
    }else{
        newsletter = false;
    }

    //console.log(req.body)
    await User.create({ name, occupation, newsletter })
    res.redirect('/')
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({raw: true, where: { id:id }});

    res.render('userview', { user });
})

app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id;

    await User.destroy({ where: { id: id }});

    res.redirect('/');
})

app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ include: Address, where: { id: id }});

    res.render('useredit', { user: user.get({plain: true}) });
})

app.post('/users/update', async (req, res) => {
    const { name, occupation, id } = req.body;
    let newsletter = req.body.newsletter;

    if(newsletter === 'on'){
        newsletter = true;
    }else{
        newsletter = false;
    }

    await User.update({ name, occupation, newsletter }, { where: { id: id }})
 
    res.redirect('/')
})

app.post('/address/create', async (req, res) => {
    const UserId = req.body.UserId;
    const number = req.body.number;
    const street = req.body.street;
    const city = req.body.city;
    
    await Address.create({ UserId, street, number, city })

    res.redirect(`/users/edit/${UserId}`)
})

app.post('/address/delete', async (req, res) => {
    const id = req.body.id;
    const UserId = req.body.UserId;

    await Address.destroy({ where: { id: id }});

    res.redirect(`/users/edit/${UserId}`)
})

app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true});

    //console.log(users)
    res.render('home', { users: users });
})

// listen to port
conn
    .sync()
    //.sync({ force: true }) //Remove this line to delete the tables
    .then(() => {
    app.listen(3000, () => {
        console.log('listening on port 3000');
    })
}).catch((err) => {
    console.log(err);
})