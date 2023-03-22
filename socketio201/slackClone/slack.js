const express = require('express');
const app = express();
const socketio = require('socket.io');
const Room = require('./classes/Room');

const namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer)

app.set('io',io);


//manufactured way to change an ns (without building a huge UI)
app.get('/change-ns',(req, res)=>{
    //update namespaces array
    namespaces[0].addRoom(new Room(0,'Deleted Articles',0))
    //let everyone know in THIS namespace, that it changed
    io.of(namespaces[0].endpoint).emit('nsChange',namespaces[0]);
    res.json(namespaces[0]);
})

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
        // console.log(`${socket.id} has connected to ${namespace.endpoint}`)
        socket.on('joinRoom',async(roomTitle,ackCallBack)=>{
            //need to fetch the history
            
            //leave all rooms, because the client can only be in one room
            const rooms = socket.rooms;
            // console.log(rooms);
            let i = 0;
            rooms.forEach(room=>{
                //we don't want to leave the socket's personal room which is guaranteed to be first
                if(i!==0){
                    socket.leave(room);
                }
                i++;
            })

            //join the room! 
            // NOTE - roomTitle is coming from the client. Which is NOT safe.
            // Auth to make sure the socket has right to be in that room
            socket.join(roomTitle);

            //fetch the number of sockets in this room
            const sockets = await io.of(namespace.endpoint).in(roomTitle).fetchSockets()
            // console.log(sockets);
            const socketCount = sockets.length;

            ackCallBack({
                numUsers: socketCount,
            })
        })
    })
})

