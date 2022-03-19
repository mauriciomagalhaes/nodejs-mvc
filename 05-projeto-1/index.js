const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

// Connection to database
const conn = require('./db/conn');

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.urlencoded({ extended: false })); // Recive data from body
app.use(express.static('public')) // Static files
app.use(express.json()); // Json
app.use(flash());
// Midllwares for sessions
app.use(session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function () {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
    }
}))

// set seesion to response
app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session;
    }

    next();
})

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