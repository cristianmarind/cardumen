var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const port = process.env.PORT || 8081;

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
    /*socket.emit('story', storyParts);
    socket.emit('new-word', nowWord);*/
    socket.on('new-carpuling', function (data) {
        io.sockets.emit('position-carpuling', data);
    });
});

server.listen(port, function () {
    console.log("Corriendo por el puerto " + port)
});

