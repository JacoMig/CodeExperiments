import React, {Component} from "react"

class Clock extends Component{
    constructor(props){
        super(props);
        this.state = { date: new Date() };
    }
    componentWillMount(){
        // We use arrow function because of "this" scope.
        // We need the reference to the main class scope
        this.timerId = setInterval( () => {
           this.setState( { date: new Date() } )
        }, 1000) 
    }
    componentWillUnmount(){
        clearInterval(this.timerId);
    }
    render(){
       return <div>
                <h1>Hello World</h1>
                <h2>It is { this.state.date.toLocaleTimeString() }</h2>
            </div>
    }
}


export default Clock