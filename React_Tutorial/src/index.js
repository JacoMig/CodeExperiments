import React, { Component } from "react";
import ReactDom from "react-dom";
// import HelloWorld from "./components/HelloWorld";

/*
// ELEMENT. 
// Element is a part of a component is made of.
// Can be a DOM element Or some Html Content
const Div = < div />
const Lorem = <p>Lorem Ipsum </p>;
// an Element can be rendered in a DOM Node only passing the name
ReactDom.render(Div, document.getElementById('root')); 
*/

// This is a way to let the ELEMENT UPDATE.
// We simply call a function each second to show the timer going on
// Not the best practice! ( Just an example )
/* function tick(){
    const element = (
        <div>
            <h1>Hello World!</h1>
            <h2>It is { new Date().toLocaleTimeString() }</h2>    
        </div>
    );
    ReactDom.render(element, document.getElementById('root'));
}
setInterval(tick, 1000); */

// COMPONENT
// A Component a JS Function that return something
// You can pass to the component some arguments called props
/* function Welcome(props){
    return <h2>Hello, { props.name }</h2>
} */
// A COMPONENT is also a JS Class. 
/* class Welcome extends Component{
    render() {
        return <h2>Hello, { this.props.name }</h2>
    }
}
// It has to be rendered in a DOM Node. Like this < Compoennt name />.
// A COMPONENT must be 
ReactDom.render(<Welcome name="Mario" />, document.getElementById('root')); */

/*
// An ELEMENT can be also a definition of Component
function Welcome(props){
    return <h2>Hello, { props.name }</h2>
}
const ElementWelcome = <Welcome name="Julie" />
// and rendered in the same way
ReactDom.render(ElementWelcome, document.getElementById('root'));  */

// We can create a COMPONENT App that call the Welcome COMPONENT many times
/* function Welcome(props){
    return <h2>Hello, { props.name }</h2>
}

function App(){
    return <div>
       < Welcome name="Sara" /> 
       < Welcome name="Luigi" />
       < Welcome name="Patrizio" />
    </div>
}
ReactDom.render(<App />, document.getElementById('root')); */


// CLOCK COMPONENT
class Clock extends Component{
    constructor(props){
        super(props);
        this.state = { date: new Date() };
    }
    componentWillMount(){
        // We use arrow function because of the this scope.
        // We need the reference to the class scope
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

ReactDom.render(<Clock />, document.getElementById('root'));
