const express = require('express');
const app = express();
const socketio = require('socket.io');
const Room = require('./classes/Room');

const namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer)

io.on('connection',(socket)=>{
    socket.emit('welcome',"Welcome to the server.");
    socket.on('clientConnect',(data)=>{
        console.log(socket.id,"has connected")
        socket.emit('nsList',namespaces)
    })
})

namespaces.forEach(namespace=>{
    // const thisNs = io.of(namespace.endpoint)
    io.of(namespace.endpoint).on('connection',(socket)=>{
        console.log(`${socket.id} has connected to ${namespace.endpoint}`)
    })
})

