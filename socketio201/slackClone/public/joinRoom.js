const joinRoom = (roomTitle,namespaceId)=>{

    console.log(roomTitle,namespaceId);
    nameSpaceSockets[namespaceId].emit('joinRoom',roomTitle);

}