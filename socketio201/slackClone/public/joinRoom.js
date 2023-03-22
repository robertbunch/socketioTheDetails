const joinRoom = (roomTitle,namespaceId)=>{

    console.log(roomTitle,namespaceId);
    nameSpaceSockets[namespaceId].emit('joinRoom',roomTitle,(ackResp)=>{
        console.log(ackResp);

        document.querySelector('.curr-room-num-users').innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user"></span>`
        document.querySelector('.curr-room-text').innerHTML = roomTitle;

    });

}