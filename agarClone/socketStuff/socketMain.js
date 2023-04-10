//Where all our socket stuff will go
const io = require('../servers').io;
//oh... we need express, get app, but only put what we need to inside of our socket stuff
const app = require('../servers').app;

const Orb = require('./classes/Orb');
//make an orbs array that will host all 500/5000 NOT PLAYER orbs.
//every time one is absorb, the server will make a new one
const orbs = [];

//on server start, to make our initial 500
initGame();
// console.log(orbs)

io.on('connect',(socket)=>{
    //event that runs on join that does init game stuff
    socket.emit('init',{
        orbs
    })
})

function initGame(){
    //loop 500 times, and push a new Orb() onto our array
    for(let i = 0; i < 500; i++){
        orbs.push(new Orb());
    }
}