const joinRoom = async(roomTitle,namespaceId)=>{

    console.log(roomTitle,namespaceId);
    const ackResp = await nameSpaceSockets[namespaceId].emitWithAck('joinRoom',{roomTitle,namespaceId});
    console.log(ackResp);
    document.querySelector('.curr-room-num-users').innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user"></span>`
    document.querySelector('.curr-room-text').innerHTML = roomTitle;

    //we get back the room history in the acknowledge as well!
    document.querySelector('#messages').innerHTML = "";

    ackResp.thisRoomsHistory.forEach(message=>{
        document.querySelector('#messages').innerHTML += buildMessageHtml(message)
    })


    // nameSpaceSockets[namespaceId].emit('joinRoom',roomTitle,(ackResp)=>{
    //     console.log(ackResp);

    //     document.querySelector('.curr-room-num-users').innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user"></span>`
    //     document.querySelector('.curr-room-text').innerHTML = roomTitle;

    // });


}