class Namespace {
    constructor(id, nsTitle, img) {
        this.id = id;
        this.nsTitle = nsTitle;
        this.img = img;
        this.rooms = [];
    }
    addRoom(roomObj){
        this.rooms.push(roomObj);
    }
}

module.exports = Namespace;