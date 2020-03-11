// We need http because we dont have express
const http = require('http');
// We need socketio...it's 3rd party!
const socketio = require('socket.io');

// We make an http server with node! 
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