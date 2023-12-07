const express = require('express');
const app = express();
app.use(express.static(__dirname));
const socketio = require('socket.io')
const expressServer = app.listen(8000);

const io = socketio(expressServer,{
    cors: {
        origin: ['http://localhost:8000'],
        credentials: true,
    }
});

io.on('connection',(socket)=>{
    let squareFunction; //scoped to this socket
    // This is a ClientRpc - call
    // Does it have to be event-driven
    socket.on('give me a number', function (cb) {
        cb(4);
        squareFunction = cb // //try and store the callback 
    });

    const square = (num)=>{
        console.log(num)
        return num * num
    }
    socket.on('getSquareFunc',(cb)=>{
        cb(square)
    })

    setInterval(()=>{
        const rand = Math.floor(Math.random() * 10)
        //try and run saved function... won't error, but the function isn't registered
        squareFunction(rand) 
        socket.emit("runsSquareWith",rand) //emit notice to the client, does accomplish the same thing, but not rpc paradigm
    },1000)

    setInterval(()=>{
        // ServerRpc getting executed
        socket.emit('give me a sentence', function (sentence) {
            const sentAsBuff = Buffer(sentence).toString('base64')
            console.log(sentAsBuff,'base64')
            console.log(sentence)
        });
    },1000)

    setInterval(()=>{
        // ServerRpc getting executed
        const cb = socket.emitWithAck('squareFromServer', function (num) {
            const sentAsBuff = Buffer(sentence).toString('base64')
            console.log(sentAsBuff,'base64')
            console.log(sentence)
        });
    },1000)

})