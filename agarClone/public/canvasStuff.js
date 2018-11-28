function init(){
    draw()
}

// ================================
// =============DRAWING============
// ================================
let randomX = Math.floor(500*Math.random() + 100)
let randomY = Math.floor(500*Math.random() + 100)
console.log(randomX)
function draw(){
    context.beginPath()
    context.fillStyle = "rgb(255,230,230)"
    // arg1,2 = x,y of the center of the arc
    // arg3 = radius
    // arg4 = where to start on the circle in radians, 0 = 3:00
    // arg5 = where to stop in radians
    context.arc(randomX,randomY,10,0,Math.PI*2)
    context.fill()
    context.lineWidth = 3;
    context.strokeStyle = 'rgb(0,255,0)'
    context.stroke()
    requestAnimationFrame(draw)
}

canvas.addEventListener('mousemove',(event)=>{
    console.log(event)
})