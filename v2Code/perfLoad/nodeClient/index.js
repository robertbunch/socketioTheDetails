// The node program that captures local performance data
// and sends it up to the socket.io server
// Req:
// - farmhash
// - socket.io-client

const os = require('os');
const io = require('socket.io-client');
let socket = io('http://127.0.0.1:8181');

socket.on('connect',()=>{
    // console.log('I connected to the socket server... hooray!')
    // we need a way to identify this machine to whomever concerned
    const nI = os.networkInterfaces();
    // console.log(nI)
    let macA;
    // loop through all the nI for this machine and find a non-internal one
    for(let key in nI){

        // FOR TESTING PURPOSES!!!
        macA = Math.floor(Math.random() * 3) + 1;
        break;
        // FOR TESTING PURPOSES!!!

        if(!nI[key][0].internal){
            if(nI[key][0].mac === '00:00:00:00:00:00'){
                macA = Math.random().toString(36).substr(2,15);
            }else{
                macA = nI[key][0].mac;
            }
            break;
        }
    }

    // client auth with single key value
    socket.emit('clientAuth','5t78yuhgirekjaht32i3')

    performanceData().then((allPerformanceData)=>{
        allPerformanceData.macA = macA
        socket.emit('initPerfData',allPerformanceData)
    });

    // start sending over data on interval
    let perfDataInterval = setInterval(()=>{
        performanceData().then((allPerformanceData)=>{
            // console.log(allPerformanceData)
            allPerformanceData.macA = macA;
            socket.emit('perfData',allPerformanceData);
        })
    },1000);
    
    socket.on('disconnect',()=>{
        clearInterval(perfDataInterval);
    })

})

function performanceData(){
    return new Promise(async (resolve, reject)=>{
        const cpus = os.cpus();
        // What do we need to know from node about performance?
        // - CPU load (current)
        // - Memory Useage
        //  - free
        const freeMem = os.freemem();
        //  - total
        const totalMem = os.totalmem();
        const usedMem = totalMem - freeMem;
        const memUseage = Math.floor(usedMem/totalMem*100)/100;
        // - OS type
        const osType = os.type() == 'Darwin' ? 'Mac' : os.type();
        // - uptime
        const upTime = os.uptime();
        // - CPU info
        //  - Type
        const cpuModel = cpus[0].model
        //  - Number of Cores
        const numCores = cpus.length;
        //  - Clock Speed
        const cpuSpeed = cpus[0].speed
        const cpuLoad = await getCpuLoad();
        const isActive = true;
        resolve({freeMem,totalMem,usedMem,memUseage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad,isActive})
    })
}

// cpus is all cores. we need the average of all the cores which
// will give us the cpu average
function cpuAverage(){
    const cpus = os.cpus();
    // get ms in each mode, BUT this number is since reboot
    // so get it now, and get it in 100ms and compare
    let idleMs = 0;
    let totalMs = 0;
    // loop through each core
    cpus.forEach((aCore)=>{
        // loop through each property of the current core
        for(type in aCore.times){
            totalMs += aCore.times[type];
        }
        idleMs += aCore.times.idle;
    });
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    }
}

// because the times property is time since boot, we will get
// now times, and 100ms from now times. Compare them, that will
// give us current Load
function getCpuLoad(){
    return new Promise((resolve, reject)=>{
        const start = cpuAverage();
        setTimeout(()=>{
            const end = cpuAverage();
            const idleDifference = end.idle - start.idle;
            const totalDifference = end.total - start.total;
            // console.log(idleDifference,totalDifference)
            // calc the % of used cpu
            const percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference);
            resolve(percentageCpu);
        },100)
    })
}

