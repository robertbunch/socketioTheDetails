
//set height and width of canvas = window
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
//canvas element needs to be in a variable
const canvas = document.querySelector('#the-canvas');
//context is how we draw! We will be drawing in 2d
const context = canvas.getContext('2d');
//set the canvas height and width to = window height and width
canvas.height = wHeight;
canvas.width = wWidth;
const player = {} //This will be all things "this" player

//put the modals into variables so we can interact with them
const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
const spawnModal = new bootstrap.Modal(document.querySelector('#spawnModal'));


window.addEventListener('load',()=>{
    //on page load, open the login modal
    loginModal.show();
})

document.querySelector('.name-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    // console.log("SUbmitted!")
    player.name = document.querySelector('#name-input').value;
    loginModal.hide();
    spawnModal.show();
    console.log(player);
})