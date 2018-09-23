var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const port = process.env.PORT || 8080;

var coutUser = 0;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



/*
app.post('', function (req, res) {
   
});

app.get('', function (req, res) {
});*/

io.on('connection', function (socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('identify', coutUser);
    coutUser += 1;
    socket.on('new-cardumen', function (data) {
        io.sockets.emit('position-cardumen', data);
    });
});

server.listen(port, function () {
    console.log("Corriendo por el puerto " + port)
});

