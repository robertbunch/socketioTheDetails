const Orb = require('./classes/Orb')
const io = require('../servers').io;

function checkForOrbCollisions(pData,pConfig, orbs, settings){
    //ORB COLLISIONS
    for(var j = 0; j < orbs.length; j++){
    // AABB Test(square)  - Axis-aligned bounding boxes
        if(pData.locX + pData.radius + orbs[j].radius > orbs[j].locX 
            && pData.locX < orbs[j].locX + pData.radius + orbs[j].radius
            && pData.locY + pData.radius + orbs[j].radius > orbs[j].locY 
            && pData.locY < orbs[j].locY + pData.radius + orbs[j].radius){
        // Pythagoras test(circle)
            distance = Math.sqrt(
                ((pData.locX - orbs[j].locX) * (pData.locX - orbs[j].locX)) + 
                ((pData.locY - orbs[j].locY) * (pData.locY - orbs[j].locY))	
                );
            if(distance < pData.radius + orbs[j].radius){
        //COLLISION!!!
                pData.score += 1;
                pData.orbsAbsorbed += 1;
                if(pConfig.zoom > 1){
                    pConfig.zoom -= .001;
                }
                pData.radius += 0.25;
                if(pConfig.speed < -0.005){
                    pConfig.speed += 0.005;
                }else if(pConfig.speed > 0.005){
                    pConfig.speed -= 0.005;
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
        
function checkForPlayerCollisions(pData, pConfig, players, settings){
    //PLAYER COLLISIONS	
    for(var k = 0; k < players.length; k++){
        if(players[k].uid != pData.uid){
            let pLocx = players[k].locX
            let pLocy = players[k].locY
            let pR = players[k].radius
        // AABB Test - Axis-aligned bounding boxes
            if(pData.locX + pData.radius + pR > pLocx
            && pData.locX < pLocx + pData.radius + pR
            && pData.locY + pData.radius + pR > pLocy 
            && pData.locY < pLocy + pData.radius + pR){
        // Pythagoras test
                distance = Math.sqrt(
                    ((pData.locX - pLocx) * (pData.locX - pLocx)) + 
                    ((pData.locY - pLocy) * (pData.locY - pLocy))	
                    );      
                if(distance < pData.radius + pR){
            //COLLISION!!  
                    if(pData.radius > pR){
                // OTHER GUY DIED
                        let collisionData = updateScores(pData,players[k]);
                        if(pConfig.zoom > 1){
                            pConfig.zoom -= (pR * 0.25) * .001;
                        }
                        players.splice(k, 1);
                        return collisionData

                    }else if(pData.radius < pR){
                // THIS PLAYER (one checking) DIED             
                        let collisionData = updateScores(players[k],pData);
                        players.forEach((p,i)=>{
                            console.log(players[i].name, i)
                            if (pData.uid == p.uid){
                                console.log("HIt!!",i)
                                players.splice(i, 1);
                            }
                        }); 
                        return collisionData
                    }
                }
            }
        }
    }
}

function updateScores(killer, killed){
    killer.score += (killed.score + 10);
    killer.playersAbsorbed += 1;
    killed.alive = false;
    killer.radius += (killed.radius * 0.25)
    return{
        died: killed,
        killedBy: killer,
    }
}

module.exports = {checkForOrbCollisions, checkForPlayerCollisions}
