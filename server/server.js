var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function (socket) {

    console.log('Client connected');

    socket.on('message', function(message, name) {
        console.log('Received message:', message, name);
        socket.broadcast.emit('message', message, name);
    });
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/index.html'))
});

server.listen(8080);