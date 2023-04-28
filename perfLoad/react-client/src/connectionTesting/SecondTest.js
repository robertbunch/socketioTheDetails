import { useEffect } from 'react';
// import socket from '../socketConnection';
import socket from './mySocket';

const SecondTest = ()=> {

    // useEffect(()=>{
    //     socket.emit('secondTest',"DataDataData");
    // })

    const emitWelcome = ()=>{
        //we know we are connected, because this is called AFTER connect
        socket.emit('welcomeButton',"Welcome Button was pressed")
    }

    const emitEvent = ()=>{
        socket.connect('http://localhost:3000',emitWelcome,{token:'23jrtiheriufyqwidsf'})
    }


    return <button onClick={emitEvent}>Emit something</button>
}

export default SecondTest