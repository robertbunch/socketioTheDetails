//================================================================================
// THIS FILE IS SOLEY FOR STUDENTS WHO SKIPPED OVER THE "Add Rooms to DOM" lecture
//================================================================================

// const userName = prompt("What is your username?");
// const password = prompt("What is your password?");

//Temp remove the promt's to save dev headaches!
const userName = "Rob";
const password = "x";

const socket = io('http://localhost:9000');

socket.on('connect',()=>{
    console.log("Connected!");
    socket.emit('clientConnect');
})

//lisen for the nsList event from the server which gives us the namespaces
socket.on('nsList',(nsData)=>{
    console.log(nsData);
    const nameSapcesDiv = document.querySelector('.namespaces');
    nsData.forEach(ns=>{
        //update the HTML with each ns
        nameSapcesDiv.innerHTML +=  `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`
    })

    Array.from(document.getElementsByClassName('namespace')).forEach(element=>{
        console.log(element)
        element.addEventListener('click',e=>{
            const nsEndpoint = element.getAttribute('ns');
            console.log(nsEndpoint);

            const clickedNs = nsData.find(row=>row.endpoint === nsEndpoint);
            const rooms = clickedNs.rooms;

            //get the room-list div
            let roomList = document.querySelector('.room-list');
            //clear it out
            roomList.innerHTML = "";
            //loop through each room, and add it to the DOM
            rooms.forEach(room=>{
                roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`
            })

        })
    })

})
