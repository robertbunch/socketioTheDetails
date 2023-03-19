
// const userName = prompt("What is your username?");
// const password = prompt("What is your password?");

//Temp remove the promt's to save dev headaches!
const userName = "Rob";
const password = "x";

//always join the main namespace, because that's where the client gets the other namespaces from
const socket = io('http://localhost:9000');
// const socket2 = io('http://localhost:9000/wiki');
// const socket3 = io('http://localhost:9000/mozilla');
// const socket4 = io('http://localhost:9000/linux');

//sockets will be put into this array, in the index of their ns.id
const nameSpaceSockets = [];
const listeners = {
    nsChange: [],
}

const addListeners = (nsId)=>{
    // nameSpaceSockets[ns.id] = thisNs;
    if(!listeners.nsChange[nsId]){
        nameSpaceSockets[nsId].on('nsChange',(data)=>{
            console.log("Namespace Changed!");
            console.log(data);
        })
        listeners.nsChange[nsId] = true;
    }else{
        //nothing to do the listener has been added
    }
}

socket.on('connect',()=>{
    console.log("Connected!");
    socket.emit('clientConnect');
})

//lisen for the nsList event from the server which gives us the namespaces
socket.on('nsList',(nsData)=>{
    const lastNs = localStorage.getItem('lastNs');
    console.log(nsData);
    const nameSapcesDiv = document.querySelector('.namespaces');
    nameSapcesDiv.innerHTML = "";
    nsData.forEach(ns=>{
        //update the HTML with each ns
        nameSapcesDiv.innerHTML +=  `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`

        //initialize thisNs as its index in nameSpaceSockets.
        //If the connection is new, this will be null
        //If the connection has already been established, it will reconnect and remain in its spot
        // let thisNs = nameSpaceSockets[ns.id];
        
        if(!nameSpaceSockets[ns.id]){
            //There is no socket at this nsId. So make a new connection!
            //join this namespace with io()
            nameSpaceSockets[ns.id] = io(`http://localhost:9000${ns.endpoint}`);
        }
        addListeners(ns.id);

    })

    Array.from(document.getElementsByClassName('namespace')).forEach(element=>{
        element.addEventListener('click',e=>{
            console.log(element)
            joinNs(element,nsData);
        })
    })
    

    //if lastNs is set, grab that element instead of 0.
    joinNs(document.getElementsByClassName('namespace')[0],nsData)

})
