const Orb = require('./classes/Orb')
const io = require('../servers').io;

function checkForOrbCollisions(pData,pConfig, orbs, settings){
    return new Promise((resolve, reject)=>{
        //ORB COLLISIONS
        orbs.forEach((orb,i)=>{
            // console.log("CHECK FOR COLLISIONS")
        // AABB Test(square)  - Axis-aligned bounding boxes
            if(pData.locX + pData.radius + orb.radius > orb.locX 
                && pData.locX < orb.locX + pData.radius + orb.radius
                && pData.locY + pData.radius + orb.radius > orb.locY 
                && pData.locY < orb.locY + pData.radius + orb.radius){
            // Pythagoras test(circle)
                distance = Math.sqrt(
                    ((pData.locX - orb.locX) * (pData.locX - orb.locX)) + 
                    ((pData.locY - orb.locY) * (pData.locY - orb.locY))	
                    );
                if(distance < pData.radius + orb.radius){
            //COLLISION!!!
                    pData.score += 1;
                    pData.orbsAbsorbed += 1;
                    // pData.color = orb.color;
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
                    orbs.splice(i, 1, new Orb(settings))
                    // can't hit more than one orb on a tick so return
                    resolve(i)
                }
            }
        });
        // if we got out of the loop, there was no collision.
        // Reject promise
        reject()
    });
}
        
function checkForPlayerCollisions(pData,pConfig,players,playerId){
    return new Promise((resolve, reject)=>{
        //PLAYER COLLISIONS	
        players.forEach((curPlayer,i)=>{
            if(curPlayer.uid != playerId){
                // console.log(curPlayer.uid,pData.uid)
                let pLocx = curPlayer.locX
                let pLocy = curPlayer.locY
                let pR = curPlayer.radius
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
                    // ENEMY DEATH
                            let collisionData = updateScores(pData,curPlayer);
                            if(pConfig.zoom > 1){
                                pConfig.zoom -= (pR * 0.25) * .001;
                            }
                            players.splice(i, 1);
                            resolve(collisionData);

                        }
                        // else if(pData.radius < pR){           
                        //     let collisionData = updateScores(curPlayer,pData);
                        //     players.forEach((p,i)=>{
                        //         console.log(players[i].name, i)
                        //         if (pData.uid == p.uid){
                        //             players.splice(i, 1);
                        //         }
                        //     }); 
                        //     resolve(collisionData);
                        // }
                    }
                }
            }
        })
        reject();
    });
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
