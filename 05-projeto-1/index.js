const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

// Connection to database
const conn = require('./db/conn');

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.json());

//handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Connection with mysql and start server on port 3000
conn
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        })
    })
    .catch(err => {
        console.log(err);
    })