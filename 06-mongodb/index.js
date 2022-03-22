const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const conn = require('./db/conn');

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.urlencoded({ extended: true })); // Recive data from body
app.use(express.json()); // Json

app.listen(3000)
