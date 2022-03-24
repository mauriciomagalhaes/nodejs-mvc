const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const conn = require('./db/conn');

const productsRoutes = require('./routes/productsRoutes');


// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.urlencoded({ extended: true })); // Recive data from body
app.use(express.json()); // Json

app.use(express.static('public')); // Static files

app.use('/products', productsRoutes);

app.listen(3000)
