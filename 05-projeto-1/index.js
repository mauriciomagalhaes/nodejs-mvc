const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.json());

//handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// listen to port
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})