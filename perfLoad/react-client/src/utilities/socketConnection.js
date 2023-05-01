import io from 'socket.io-client'
const options = {
    auth: {token:'23jrtiheriufyqwidsf'}
}
const socket = io.connect('http://localhost:3000',options); //our server is at :3000
socket.on('connect',(data)=>{
    console.log(data);
})
export default socket;