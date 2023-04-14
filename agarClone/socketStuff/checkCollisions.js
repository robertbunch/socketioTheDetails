const Orb = require('./classes/Orb')
const io = require('../servers').io;

const checkForOrbCollisions = (pData,pConfig, orbs, settings)=>{
    return new Promise((resolve, reject)=>{
        //ORB COLLISIONS
        orbs.forEach((orb,i)=>{
        // AABB Test(square)  - Axis-aligned bounding boxes
            // console.log("CHECK FOR COLLISIONS")
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
                    pData.score += 1; //incrament score
                    pData.orbsAbsorbed += 1; //incrament orbs absorbed count
                    // pData.color = orb.color;
                    if(pConfig.zoom > 1){
                        pConfig.zoom -= .001; //update zoom so player doesn't get to big for screen
                    }
                    pData.radius += 0.25; //increase player size
                    if(pConfig.speed < -0.005){
                        pConfig.speed += 0.005; //increase player speed
                    }else if(pConfig.speed > 0.005){
                        pConfig.speed -= 0.005;
                    }
                    // we have to keep orbs updated for new players
                    // we just dont want to push them out more than we have to
                    orbs.splice(i, 1, new Orb(settings))
                    // can't hit more than one orb on a tock so return
                    resolve(i)
                }
            }
        });
        // if we got out of the loop, there was no collision.
        // Reject promise
        reject()
    });
}
        
const checkForPlayerCollisions = (pData,pConfig,players,playersForUsers,playerId)=>{
    return new Promise((resolve, reject)=>{
        //PLAYER COLLISIONS	
        players.forEach((p,i)=>{
            if(p.socketId != playerId){
                // console.log("Checking collision...")
                let pLocx = p.playerData.locX
                let pLocy = p.playerData.locY
                let pR = p.playerData.radius
            // AABB Test - Axis-aligned bounding boxes
                if(pData.locX + pData.radius + pR > pLocx
                && pData.locX < pLocx + pData.radius + pR
                && pData.locY + pData.radius + pR > pLocy 
                && pData.locY < pLocy + pData.radius + pR){
                    // console.log("Hit square test!");
            // Pythagoras test
                    distance = Math.sqrt(
                        ((pData.locX - pLocx) * (pData.locX - pLocx)) + 
                        ((pData.locY - pLocy) * (pData.locY - pLocy))	
                        );      
                    if(distance < pData.radius + pR){
                //COLLISION!!
                        if(pData.radius > pR){
                            // console.log("Collission!!")
                    // ENEMY DEATH
                            let collisionData = updateScores(pData,curPlayer);
                            if(pConfig.zoom > 1){
                                pConfig.zoom -= (pR * 0.25) * .001;
                            }
                            players.splice(i, 1); //remove player from server players array
                            playersForUsers.splice(i,1) //remove player from players array used by clients
                            resolve(collisionData); //essentially a return statement (because I could't get it work without a promise?)
                        }
                        
                        //This code could check to see if it the player who tocked was hit.
                        //It is commented out since the above code should run on the other player's tock 
                        //In other words, we only need to consider it a "death" on the attacking players turn
                        // else if(pData.radius < pR){ }
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
