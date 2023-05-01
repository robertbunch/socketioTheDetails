import { useEffect, useState } from "react";
import Cpu from "./Cpu"
import Mem from "./Mem"
import Info from "./Info"
import './Widget.css';
import socket from "../utilities/socketConnection";

const Widget = ({data})=>{

    const [ isAlive, setIsAlive ] = useState(true);

    const {freeMem,
        totalMem,
        usedMem,
        memUseage,
        osType,
        upTime,
        cpuType,
        numCores,
        cpuSpeed,
        cpuLoad,
        macA } = data;

    const cpuData = { cpuLoad }
    const memData = { freeMem, totalMem, usedMem, memUseage}
    const infoData = { macA, osType, upTime, cpuType, cpuSpeed, numCores}

    const notAliveDiv = !isAlive ? <div className="not-active">Offline</div> : <></>;

    useEffect(()=>{
        socket.on('connectedOrNot',({isAlive, machineMacA})=>{
            //connectedOrNot does NOT mean THIS client has disconnected (or reconnected)
            //it is for one of the nodeClients that is ticking
            //we need a new event for that, because that nodeClient has stopped ticking
            if(machineMacA === macA){
                setIsAlive(isAlive) //true or false, update isAlive
            }
        })
    },[])

    return(
        <div className="widget row justify-content-evenly">
            {notAliveDiv}
            <Cpu data={cpuData} />
            <Mem data={memData} />
            <Info data={infoData} />
        </div>
    )

}

export default Widget