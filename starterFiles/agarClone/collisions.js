
function checkForOrbCollisions(player, orbs, settings){
    //ORB COLLISIONS
    for(var j = 0; j < orbs.length; j++){
        // console.log("CHECK FOR COLLISIONS")
        // AABB Test(square)  - Axis-aligned bounding boxes
        if(player.playerData.locX + player.playerData.radius + orbs[j].radius > orbs[j].locX 
            && player.playerData.locX < orbs[j].locX + player.playerData.radius + orbs[j].radius
            && player.playerData.locY + player.playerData.radius + orbs[j].radius > orbs[j].locY 
            && player.playerData.locY < orbs[j].locY + player.playerData.radius + orbs[j].radius){
            
            // Passed AABB test, now run Pythagoras test(circle)
            distance = Math.sqrt(
                ((player.playerData.locX - orbs[j].locX) * (player.playerData.locX - orbs[j].locX)) + 
                ((player.playerData.locY - orbs[j].locY) * (player.playerData.locY - orbs[j].locY))	
            );
            if(distance < player.playerData.radius + orbs[j].radius){
                //CIRCLE COLLISION!!!
                player.playerData.score += 1;
                player.playerData.orbsAbsorbed += 1;
                // player.playerData.color = orbs[j].color;
                if(player.playerConfig.zoom > 1){
                    player.playerConfig.zoom -= .001;
                }
                player.playerData.radius += 0.25;
                if(player.playerConfig.speed < -0.005){
                    player.playerConfig.speed += 0.005;
                }else if(player.playerConfig.speed > 0.005){
                    player.playerConfig.speed -= 0.005;
                }
                // we have to keep orbs updated for new players
                // we just dont want to push them out more than we have to
                orbs.splice(j, 1);
                let newOrb = new Orb(settings) 
                orbs.push(newOrb)
                // can't hit more than one orb on a tick so return
                return{
                    capturedOrbIndex: j,
                    newOrb
                } 
            }
        }
    }
}
        
function checkForPlayerCollisions(player, players, settings){
    //PLAYER COLLISIONS	
    players.forEach((otherPlayer)=>{
        if(otherPlayer.uid != player.playerData.uid){
            // console.log(otherPlayer.uid,player.playerData.uid)
            let pLocx = otherPlayer.locX
            let pLocy = otherPlayer.locY
            let pR = otherPlayer.radius
            // AABB Test - Axis-aligned bounding boxes
            if(
                player.playerData.locX + player.playerData.radius + pR > pLocx
                && player.playerData.locX < pLocx + player.playerData.radius + pR
                && player.playerData.locY + player.playerData.radius + pR > pLocy 
                && player.playerData.locY < pLocy + player.playerData.radius + pR)
            {
            // Passed AABB, try Pythagoras test
                distance = Math.sqrt(
                    ((player.playerData.locX - pLocx) * (player.playerData.locX - pLocx)) + 
                    ((player.playerData.locY - pLocy) * (player.playerData.locY - pLocy))	
                    );      
                if(distance < player.playerData.radius + pR){
                //PLAYER COLLISION!!  
                    if(player.playerData.radius > pR){
                        // ENEMY DEATH
                        let collisionData = updateScores(player.playerData,otherPlayer);
                        if(player.playerConfig.zoom > 1){
                            player.playerConfig.zoom -= (pR * 0.25) * .001;
                        }
                        players.splice(k, 1);
                        return collisionData
                    }else if(player.playerData.radius < pR){
                    // Player DEATH
                        let collisionData = updateScores(otherPlayer,player.playerData);
                        players.forEach((p,i)=>{
                            console.log(players[i].name, i)
                            if (player.playerData.uid == p.uid){
                                console.log("HIt!!",i)
                                players.splice(i, 1);
                            }
                        }); 
                        // There was a collision. We only handle one per tick. Stop looking.
                        return collisionData
                    }
                }
            }
        }
    })
}


function updateScores(killer, killed){
    killer.score += (killed.score + 10);
    killer.playersAbsorbed += 1;
    killed.alive = false;
    // killer.radius += (killed.radius * 0.25)
    return{
        died: killed,
        killedBy: killer,
    }
}

module.exports = {checkForOrbCollisions, checkForPlayerCollisions}
