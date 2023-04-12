//connect to the socket server!
const socket = io.connect('http://localhost:9000');

const init = async()=>{
    //init is called inside of start-game click listener
    const initOrbs = await socket.emitWithAck('init',{
        playerName: player.name
    })
    console.log(initOrbs);
    orbs = initOrbs;    
    draw(); //draw function is in canvasStuff
}

socket.on('initReturn',(initData)=>{

})