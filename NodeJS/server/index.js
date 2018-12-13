const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      session = require('express-session');

const PORT = 3000;
const app = express();

const Server = http.createServer(app);

mongoose.connect('mongodb://localhost/agenda_db', { useNewUrlParser: true});

app.use(express.static('../client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({
    secret: 'secret-pass',
    cookie: { maxAge: 3600000},
    resave: false,
    saveUninitialized: true,
}));

app.use('/events', Routing)
Server.listen(PORT,function () {
    console.log('Server is listening on port: '+ PORT)
})