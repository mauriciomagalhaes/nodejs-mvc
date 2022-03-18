const express = require('express');
const exphbs = require('express-handlebars');

// Modulos
const app = express();
const conn = require('./db/conn');

// Models
const Task = require('./models/Task');

// Routes
const tasksRoutes = require('./routes/tasksRoutes');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.json());
app.use('/tasks', tasksRoutes);

// HandleBars - VIEW ENGINE
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