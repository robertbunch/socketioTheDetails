
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
        //join this namespace with io()
        const thisNs = io(`http://localhost:9000${ns.endpoint}`);
        thisNs.on('nsChange',(data)=>{
            console.log("Namespace Changed!");
            console.log(data);
        })
        
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
