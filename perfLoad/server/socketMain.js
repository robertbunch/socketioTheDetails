//Where socket.io listeners and (most) emitters

const socketMain = (io)=>{
    io.on("connection", (socket) => {
        console.log(`Someone connected on worker ${process.pid }`);
        socket.emit('welcome',"Welcome to our cluster driven socket.io server!");
    });
}

module.exports = socketMain;