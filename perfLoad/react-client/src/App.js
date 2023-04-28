import { useEffect, useState } from 'react';
import './App.css';
import socket from './socketConnection';
import Widget from './perfDataComponents/Widget';

function App() {

  const [ performanceData, setPerformanceData] = useState({})

  useEffect(()=>{
    // socket was created on load of the component (line 3).
    //add a listener to that socket!
    socket.on('perfData',(data)=>{
      //we just got some data!
      // console.log(data);
      //copy performanceData so we can mutate it!
      const copyPerfData = {...performanceData};
      //performanceData is NOT an array. its an {}
      //this is because we don't know which machine just sent it's data
      //so we can use the macA of the machine as it's property in performanceData
      //every tick the data comes through, just overwrite that value
      copyPerfData[data.macA] = data;
      setPerformanceData(copyPerfData);
    })
  },[]) //run this once the component has rendered

  return (
    <Widget />
  );
}

export default App;
