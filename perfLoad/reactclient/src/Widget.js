import React, {Component} from 'react';
import Cpu from './Cpu';
import Mem from './Mem';
import Info from './Info';
import './widget.css';

class Widget extends Component{
    constructor(){
        super();
        this.state = {};
    }

    render(){
        const { freeMem,totalMem,usedMem,memUseage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad, macA } = this.props.data;
        const cpu = {cpuLoad}
        const mem = {totalMem, usedMem, memUseage,freeMem}
        const info = {macA,osType,upTime,cpuModel,numCores,cpuSpeed}
        return(
            <div>
                <Cpu cpuData = {cpu} />
                <Mem memData = {mem} />
                <Info infoData = {info} />
            </div>
        )
    }
}
export default Widget;