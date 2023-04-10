//connect to the socket server!
const socket = io.connect('http://localhost:9000');

socket.on('init',(initData)=>{
    console.log(initData);
    orbs = initData.orbs;
})