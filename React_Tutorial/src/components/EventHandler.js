import React, {Component} from "react"

class EventHandler extends Component{
    constructor(props){
        super(props);
        this.state = { isToggledOn : false }
    }
    
    clickEvent(id, e){
        e.preventDefault();
        this.setState({ isToggledOn : !this.state.isToggledOn }, () => { 
            // To use the updated state use the callback of setState 
            console.log(this.state.isToggledOn);
         }); 
         console.log(id)
    }

    // three ways of binding "this" (refer to the Component) :
    //  1- <button onClick={this.clickEvent.bind(this)}>
    //  2- <button onClick={(e) => this.clickEvent(e)}>
    //  3- in the constructor 
    //    this.clickEvent = this.clickEvent.bind(this);
        
    //    In the arrow function case (2-) makes the component render two times
    
    render(){
        return <button id="myButton" onClick={this.clickEvent.bind(this, "myID")}>
            { this.state.isToggledOn ? "Off" : "On" }
        </button>
    }

}


export default EventHandler