// Where all our main socket stuff will go
const io = require('../servers').io


// =============CLASSES==========
const Player = require('./classes/Player')
const PlayerData = require('./classes/PlayerData')
const PlayerConfig = require('./classes/PlayerConfig')
const Orb = require('./classes/Orb')
let orbs = []
let players = []
let settings = {
    defaultOrbs: 500,
    defaultSpeed: 6,
    defaultSize: 6,
    // as player gets bigger, the zoom needs to go out
    defaultZoom: 1.5,
    worldWidth: 500,
    worldHeight: 500
}

initGame()

io.sockets.on('connect',(socket)=>{
    let player = {}
    // a player has connected
    socket.on('init',(data)=>{
        // add the player to the game namespace
        socket.join('game');
        // make a playerConfig object
        let playerConfig = new PlayerConfig(settings)
        // make a playerData object
        let playerData = new PlayerData(data.playerName,settings)
        // make a master player object to hold both
        player = new Player(socket.id, playerConfig, playerData)

        // issue a message to EVERY connected socket 30 fps
        setInterval(()=>{
            io.to('game').emit('tock',{
                players,
                playerX: player.playerData.locX,
                playerY: player.playerData.locY,
            });
        },33); //there are 30 33s in 1000 milliseconds, or 1/30th of a second, or 1 of 30fps

        socket.emit('initReturn',{
            orbs
        })
        players.push(playerData)
    })
    // the server sent over a tick. That means we know what direction to move the socket
    socket.on('tick',(data)=>{
        speed = player.playerConfig.speed
        // update the playerConfig object with the new direction in data
        // and at the same time create a local variable for this callback for readability
        xV = player.playerConfig.xVector = data.xVector;
        yV = player.playerConfig.yVector = data.yVector;
    
        if((player.playerData.locX < 5 && player.playerData.xVector < 0) || (player.playerData.locX > 500) && (xV > 0)){
            player.playerData.locY -= speed * yV;
        }else if((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500) && (yV < 0)){
            player.playerData.locX += speed * xV;
        }else{
            player.playerData.locX += speed * xV;
            player.playerData.locY -= speed * yV;
        }
    })
})

// Run at the beginning of a new game
function initGame(){
    for(let i = 0; i < settings.defaultOrbs; i++){
        orbs.push(new Orb(settings))
    }
}




module.exports = io