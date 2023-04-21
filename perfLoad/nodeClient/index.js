// The node program that captures local performance data
// and sends it via socket to the server
// Req:
// - farmhash
// - socket.io-client

const os = require('os'); //native to node!

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
    console.log(totalMem, freeMem,memUseage)
// - OS type
const osType = os.type() === 'Darwin' ? 'Mac' : os.type();
console.log(osType)
// - uptime
const upTime = os.uptime();
console.log(upTime)
// - CPU info
    // -Type
    const cpuType = cpus[0].model;
    // - Number of cores
    const numCores = cpus.length;
    // - Clock Speed
    const cpuSpeed = cpus[0].speed;
    console.log(cpus)
    console.log(cpuType,numCores,cpuSpeed);