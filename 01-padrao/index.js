const express = require('express');
const expnbs = require('express-handlebars');
const conn = require('./db/conn');
const path = require('path');
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.json());

//handlebars
app.engine('handlebars', expnbs.engine());
app.set('view engine', 'handlebars');


// listen to port
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})