let socket = io.connect('http://localhost:8080')

socket.on('init',(data)=>{
    // console.log(data.orbs)
    orbs = data.orbs
})