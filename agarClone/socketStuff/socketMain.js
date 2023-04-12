//Where all our socket stuff will go
const io = require('../servers').io;
//oh... we need express, get app, but only put what we need to inside of our socket stuff
const app = require('../servers').app;

//================CLASSES================
const Player = require('./classes/Player');
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData');
const Orb = require('./classes/Orb');
//=======================================

//make an orbs array that will host all 500/5000 NOT PLAYER orbs.
//every time one is absorb, the server will make a new one
const orbs = [];
const settings = {
    defaultNumberOfOrbs: 500, //number of orbs on the map
    defaultSpeed: 6, //player speed
    defaultSize: 6, //default player speed
    defaultZoom: 1.5, // as the player gets bigger, zoom needs to go out
    worldWidth: 500,
    worldHeight: 500,
    defaultGenericOrbSize: 5, //smaller than player orbs
}

//on server start, to make our initial defaultNumberOfOrbs
initGame();
// console.log(orbs)

io.on('connect',(socket)=>{
    // a player has connected
    //event that runs on join that does init game stuff
    // make a playerConfig object - the data specific to this player that only the player needs to know
    const playerName = "Rob";
    const playerConfig = new PlayerConfig(settings);
    const playerData = new PlayerData(playerName,settings)
    const player = new Player(socket.id,playerConfig,playerData);
    // make a playerData object - the data specific to this player that everyone needs to know
    // a master player object to house both    
    socket.emit('init',{
        orbs
    })
})

function initGame(){
    //loop defaultNumberOfOrbs times, and push a new Orb() onto our array
    for(let i = 0; i < settings.defaultNumberOfOrbs; i++){
        orbs.push(new Orb(settings));
    }
}