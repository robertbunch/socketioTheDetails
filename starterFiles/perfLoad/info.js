import React from 'react';

function CpuInfo(props){
    return (
        <div className="col-sm-3 col-sm-offset-1 cpu-info">
          <h3>Operating System</h3>
          <div className="widget-text">{props.cpuInfo.osType}</div>
          <h3>Time Online</h3>
          <div className="widget-text">{props.cpuInfo.upTime}</div>
          <h3>Processor information</h3>
          <div className="widget-text"><strong>Type:</strong> {props.cpuInfo.cpuModel}</div>
          <div className="widget-text"><strong>Number of Cores:</strong> {props.cpuInfo.cpuNumCores}</div>
          <div className="widget-text"><strong>Clock Speed:</strong> {props.cpuInfo.cpuSpeed}</div>
        </div>
    );
}

export default(CpuInfo);
