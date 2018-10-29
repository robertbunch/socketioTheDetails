class Room {
    constructor(roomTitle, namespace, privateRoom = false) {
      this.roomTitle = roomTitle;
      this.privateRoom = privateRoom;
      this.members = [];
      this.history = [];
    }
    addMember(socketId){
        this.members.push(socketId);
    }
    removeMember(socketId){
        const index = this.members.findIndex(socketId);
        if(index){
            this.members.splice(index,1);
        }
    }
}

module.exports = Room;