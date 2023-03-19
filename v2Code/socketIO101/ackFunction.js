const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res)=>{
    res.end("I am connected!")
});

const io = socketio(server);

io.on('connection', (socket,req)=>{
    socket.emit('welcome','Welcome to the websocket server!!',(data)=>{
        console.log(data)
    });
})

server.listen(8001);