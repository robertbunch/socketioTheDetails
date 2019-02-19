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
        const { freeMem,totalMem,usedMem,memUseage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad, macA, isActive } = this.props.data;

        const cpuWidgetId = `cpu-widget-${macA}`;
        const memWidgetId = `mem-widget-${macA}`;

        const cpu = {cpuLoad, cpuWidgetId}
        const mem = {totalMem, usedMem, memUseage,freeMem, memWidgetId}
        const info = {macA,osType,upTime,cpuModel,numCores,cpuSpeed}

        let notActiveDiv = '';
        if(!isActive){
            notActiveDiv = <div className="not-active">Offline</div>
        }



        return(
            <div className="widget col-sm-12">
                {notActiveDiv}
                <Cpu cpuData = {cpu} />
                <Mem memData = {mem} />
                <Info infoData = {info} />
            </div>
        )
    }
}
export default Widget;