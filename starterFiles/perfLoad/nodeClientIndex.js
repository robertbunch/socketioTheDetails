// The node program that captures local performance data
// and sends it up to the socket.io server
// Req:
// - farmhash
// - socket.io-client

const os = require('os');
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


// cpus is all cores. we need the average of all the cores which
// will give us the cpu average
function cpuAverage(){
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

// cpuAverage = gets the average since boot
// getCpuLoad = get the cpuAverage now, and 100ms from now
// see how much they have changed, in order to find load
function getCpuLoad(){
    
    // get first average load
    const start = cpuAverage();
    console
    // set a delay of 100ms, to check again
    setTimeout(()=>{
        // grab 2nd average load
        const end = cpuAverage();
        // console.log(start, end)
        const idleDif = end.idle - start.idle;
        const totalDif = end.total - start.total;
        console.log(start.idle, end.idle)
        // calc the %
        const percCpu = 100 - Math.floor((100 * idleDif / totalDif));
        console.log(idleDif / totalDif)
    },2000)
}

getCpuLoad()
