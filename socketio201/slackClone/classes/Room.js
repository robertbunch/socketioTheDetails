class Room{
    constructor(roomId,roomTitle,namespaceId,privateRoom = false){
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.namespaceId = namespaceId;
        this.privateRoom = privateRoom;
        this.history = [];
    }

    addMessage(message){
        this.history.push(message);
    }

    clearHistory(){
        this.history = [];
    }
}

module.exports = Room;
