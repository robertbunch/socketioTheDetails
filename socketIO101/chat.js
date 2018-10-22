const express = require('express');
const app = express();
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.of('/admin').on('connection',(socket)=>{
    console.log("Connection to /admin")
});

io.on('connection',(socket)=>{
    console.log("Connection made to main")
    socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
    socket.on('messageToServer',(dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer',(msg)=>{
        // console.log(msg)
        io.emit('messageToClients',{text:msg.text})
    })
})

