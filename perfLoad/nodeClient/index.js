// The node program that captures local performance data
// and sends it via socket to the server
// Req:
// - socket.io-client

const os = require('os'); //native to node!
const io = require('socket.io-client');
const options = {
    auth:{
        token: "239rfaiskdfvq243EGa4q3wefsdad"
    }
}
const socket = io('http://127.0.0.1:3000',options) // :3000 is where our server is listening
socket.on('connect',()=>{
    // console.log("We connected to the server!")
    //we need a way to identify this machine to the server, for front-end useage
    //we could use, socket.id, randomHash, ipAddress
    //what about macA?
    const nI = os.networkInterfaces(); //a list of all network interfaces on this machine
    let macA; //mac address
    //loop through all nI until we find a non-internal one.
    for(let key in nI){
        const isInternetFacing = !nI[key][0].internal;
        if(isInternetFacing){
            //we have a macA we can use!
            macA = nI[key][0].mac + Math.floor(Math.random()*100000);
            break;
        }
    }
    // console.log(macA);
    const perfDataInterval = setInterval(async()=>{
        //every second call performance data and emit
        const perfData = await performanceLoadData()
        perfData.macA = macA;
        socket.emit('perfData',perfData);
    },1000);

    socket.on('disconnect',()=>{
        clearInterval(perfDataInterval) //if we disconnect for any reason... stop ticking./
        //this includes!!!! reconnect
    })
})

const cpuAverage = ()=>{
    const cpus = os.cpus();
    //cpus is an array of all cores. We need the average of all the cores which
    //will give us the cpu average.
    let idleMs = 0; //idle milliseconds
    let totalMs = 0; //total milliseconds
    //loop through each core (thread)
    cpus.forEach(aCore=>{
        //loop through each property of the current core
        for(mode in aCore.times){
            //we need all modes for this core added to totalMs
            totalMs += aCore.times[mode];
        }
        //we need idle mode for this core added to idleMs
        idleMs += aCore.times.idle;
    });
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length,
    }
}

//Because the times property on cpus is time since boot, we will get
//now times, and 100ms from "now" times. Compare them, that will give
//us the current load
const getCpuLoad = ()=> new Promise((resolve, reject)=>{
    //call cpuAverage for "now"
    const start = cpuAverage(); //"now" value of load
    setTimeout(()=>{
        //call cpuAverage for "end" 100ms after "now"
        const end = cpuAverage(); //"end" value of load
        const idleDiff = end.idle - start.idle;
        const totalDiff = end.total - start.total
        // console.log(idleDiff,totalDiff)
        // calculate the % of the used cpu
        const percentOfCpu = 100 - Math.floor(100 * idleDiff / totalDiff); //%
        resolve(percentOfCpu)
    },100)
})

const performanceLoadData = ()=> new Promise(async(resolve, reject)=>{
    // What do we need to know FROM NODE about performance?
    // - CPU load (current)
    const cpus = os.cpus(); //all cpus as an array
    // - Memory Useage
    // - total
    const totalMem = os.totalmem(); //in bytes
    // - free
    const freeMem = os.freemem(); //in bytes
    // - memory useage
    const usedMem = totalMem - freeMem; 
    const memUseage = Math.floor(usedMem/totalMem*100)/100; //2 decimal places
    // console.log(totalMem, freeMem,memUseage)
    // - OS type
    const osType = os.type() === 'Darwin' ? 'Mac' : os.type();
    // console.log(osType)
    // - uptime
    const upTime = os.uptime();
    // console.log(upTime)
    // - CPU info
    // -Cpu Type
    const cpuType = cpus[0].model;
    // - Number of cores
    const numCores = cpus.length;
    // - Clock Speed
    const cpuSpeed = cpus[0].speed;
    // console.log(cpus)
    // console.log(cpuType,numCores,cpuSpeed);
    const cpuLoad = await getCpuLoad();
    resolve({
        freeMem,
        totalMem,
        usedMem,
        memUseage,
        osType,
        upTime,
        cpuType,
        numCores,
        cpuSpeed,
        cpuLoad,
    })
})


// const run = async()=>{
//     const data = await performanceLoadData();
//     console.log(data);
// }
// run()