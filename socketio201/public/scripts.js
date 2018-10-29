const socket = io('http://localhost:5000');
console.log(socket.io)
socket.on('connect',()=>{
    console.log(socket.id)
})

socket.on('nsList',(nsList)=>{
    console.log(nsList)
})

socket.on('catchUpMessages',(msgs)=>{
    console.log(msgs)
    msgs.data.forEach(msg => {
        const currentMessages = document.querySelector('#messages').innerHTML;
        document.querySelector('#messages').innerHTML = `<li>${msg}</li>` + currentMessages;
    });
});

socket.on('messageFromServer',(dataFromServer)=>{
    // console.log(dataFromServer);
    socket.emit('dataToServer',{data: "Data from the Client!"})
})

socket.on('messageToClients',(msg)=>{
    console.log(msg)
    const currentMessages = document.querySelector('#messages').innerHTML;
    document.querySelector('#messages').innerHTML = `<li>${msg.text} - ${(msg.time - Date.now())/1000} seconds ago</li>` + currentMessages
    document.querySelector('#user-message').value = ""
})

document.querySelector('#message-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer',{text: newMessage})
})

function joinRoom(roomJoin,roomLeave){
    socket.emit('joinRoom',roomJoin,roomLeave);
    console.log("Sup")
}

