import { useEffect, useState } from 'react';
import './App.css';
import socket from './utilities/socketConnection';
import Widget from './perfDataComponents/Widget';

function App() {

  const [ performanceData, setPerformanceData] = useState({})
  const perfMachineData = {};

  useEffect(()=>{
    //listen for perfData
    socket.on('perfData',(data)=>{
      //one line of data came through for one machine
      //updateour LOCAL (non-state) variable, to include that new data
      perfMachineData[data.macA] = data; //this will not cause a re-render
    })
  },[]) //run this once the component has rendered
 
  useEffect(()=>{
    setInterval(()=>{
      setPerformanceData(perfMachineData)
    },1000)
  },[])

  const widgets = Object.values(performanceData).map(d=><Widget data={d} key={d.macA} />)

  return (
    <div className="container">
      {widgets}
    </div>
  );
}

export default App;
