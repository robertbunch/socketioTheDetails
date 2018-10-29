const express = require('express');
const app = express();
const socketio = require('socket.io')
app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(9000);
const io = socketio(expressServer);

let namespaces = require('./data/namespaces');

namespaces.forEach((namespace)=>{
    io.of(namespace).on('connection',(socket)=>{
        console.log("Someone is here!")
    })
})

io.on('connection',(socket)=>{
    // socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
    // push the new socket onto the member list of main room
    nsToSend = namespaces.map((ns)=>{
        console.log(ns.nsTitle)
        return ns.nsTitle;
    })
    io.emit('nsList',nsToSend)
});

io.of('/wiki',()=>{
    rooms[0].addMember(socket.id);
    console.log(socket.rooms)
    socket.emit('catchUpMessages',{data: rooms[0].history});
    socket.on('messageToServer',(dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer',(msg)=>{
        console.log(socket.rooms)
        // mainRoom.push(msg.text)
        io.emit('messageToClients',{
            text: msg.text,
            time: Date.now(),
            // username: 
        });
        
    });
    socket.on('joinRoom',(roomJoin, roomLeave)=>{
        socket.leave(roomLeave, () => {
            console.log(socket.rooms)
        })
        socket.join(roomJoin, () => {
            console.log(socket.rooms)
        })
    })
})

