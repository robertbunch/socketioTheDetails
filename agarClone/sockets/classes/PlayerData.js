// This is where all the data that EVERYONE needs to know about
class PlayerData{
    constructor(playerName,settings){
        this.name = playerName;
        this.locX = Math.floor(settings.worldWidth*Math.random() + 100);
        this.locY = Math.floor(settings.worldHeight*Math.random() + 100);
        this.radius = settings.defaultSize;
        this.color = this.getRandomColor();
        this.score = 0;
    }
    getRandomColor(){
        const r = Math.floor((Math.random() * 200)+50)
        const g = Math.floor((Math.random() * 200)+50)
        const b = Math.floor((Math.random() * 200)+50)
        return `rgb(${r},${g},${b})`
    }    
}

module.exports = PlayerData