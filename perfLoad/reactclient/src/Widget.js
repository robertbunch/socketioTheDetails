import React, {Component} from 'react';
import Cpu from './Cpu';
import Mem from './Mem';
import Info from './Info';

class Widget extends Component{
    constructor(){
        super();
        this.state = {};
    }

    render(){
        return(
            <div>
                <h1>Widget!!</h1>
                <Cpu />
                <Mem />
                <Info />
            </div>
        )
    }
}
export default Widget;