import { useEffect } from 'react';
// import socket from '../socketConnection';
import SecondTest from './SecondTest';

const TestApp = ()=>{

    const testConnection = ()=>{
        socket.emit('testConnection',"Am I connected")
    }

    useEffect(()=>{
        // socket.emit('testConnection',"Am I connected?")
        //run connect. mySocket will take care of that
        //send over testConnection function. It will run once connected
        socket.connect('http://localhost:3000',testConnection,{token:'23jrtiheriufyqwidsf'})
    },[])

    return(
        <>
            <h1>Test App</h1>
            <SecondTest />
        </>
    )
}

export default TestApp