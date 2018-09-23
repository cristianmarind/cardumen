var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const port = process.env.PORT || 8080;

var coutUser = 0;
var arrIsInline = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

io.on('connection', function (socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('identify', coutUser);
    coutUser += 1;
    arrIsInline.push(true);
    socket.on('new-cardumen', function (data) {
        io.sockets.emit('position-cardumen', data);
        arrIsInline[data.id] = true;
    });
});

setInterval(function(){
    io.sockets.emit('delete-cardumen', isInline());
    for (let index = 0; index < arrIsInline.length; index++) {
        arrIsInline[index] = false;            
    }
}, 10000)

server.listen(port, function () {
    console.log("Corriendo por el puerto " + port)
});

function isInline(){
    let res = [];
    for (let index = 0; index < arrIsInline.length; index++) {
        if(!arrIsInline[index]){
            res.push(index);
        }
    }  
    return res;
}

setInterval(function(){
    coutUser = 0;
    arrIsInline = [];
}, 1800000)