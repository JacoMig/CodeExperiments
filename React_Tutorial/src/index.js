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
/* class Clock extends Component{
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
 */

// EVENT HANDLERS
/*
class ButtonClickEvent extends Component{
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

ReactDom.render(<ButtonClickEvent />, document.getElementById('root'));
*/

// CONDITIONAL RENDERING
/* function LogInButton(props){
    return <button onClick={props.onClick}>Log In</button>
}

function LogOutButton(props){
    return <button onClick={props.onClick}>Log Out</button>
}

function Greeting(props){
    if(props.userState)
        return <h1>Welcome back User!</h1>
    else
        return <h1>Please sign up</h1>    
}

class LoginControl extends Component{
    constructor(props){
        super(props);
        this.state = ({userState : true})
    }
    handleLogin(){
        this.setState({userState : !this.state.userState})
    }
    render(){
        const isLogged = this.state.userState;
        let button;
        if(!isLogged){
            button = <LogInButton onClick={this.handleLogin.bind(this)}/>;
        }else{
            button = <LogOutButton onClick={this.handleLogin.bind(this)}/>;
        } 
        
        return( 
            <div>
                <Greeting userState={this.state.userState} />
                {button}
            </div>
        )
        
        // another option for Conditional Operator is:
        // return(
        //    <div>
        //        <Greeting userState={this.state.userState} />
        //        {isLogged ? (
        //           <LogOutButton onClick={this.handleLogin.bind(this)}/>
        //        ) : (
        //            <LogInButton onClick={this.handleLogin.bind(this)}/>
        //        )}
        //    </div>
        //) 
        
    }
}

ReactDom.render(<LoginControl />, document.getElementById('root')); */

// LIST and KEYS
/* function ListItems(props){
    const items = props.numbers;
    const list = items.map( (item) => <li key={item.toString()}>{item}</li> )
    return <ul>
      { list }  
    </ul>
}
const Numbers = [1,2,3,4,5,6];
ReactDom.render( <ListItems numbers={Numbers} />, document.getElementById('root'));
 */


 // Keys can be Ids of the item, in case you dont have stable ids then use Index of the item
/* function Items(props){
    return <li>
        {props.item}
    </li>
}

function NumbersList(){
    const Numbers = [1,2,3,4,5,6];
    const numbers = Numbers.map(number => <Items key={number.toString()} item={number} /> );
    return <ul>
        { numbers }
    </ul>
}

ReactDom.render( <NumbersList />, document.getElementById('root'));  */


// Two different List of items in the same Component
/* function Blog(props){
    const Posts = props.posts;
    const content =  Posts.map((post, i) => <div key={i}>{post.content}</div>);
    const sidebar = Posts.map((post, i) => <li key={i}>{post.title}</li>);
    return <div>
        <div className="content">{content}</div>
        <ul className="sidebar">{sidebar}</ul> 
    </div>
}

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

ReactDom.render( <Blog posts={posts}/>, document.getElementById('root')); */


 // FORMS
 // INPUT, TEXTAREA and SELECT Tag all works very simliar in React
 // We create 2 methods
 // 1. Update the initial state and 2. We submit the form.
 // IMPORTANT setState is a method so you have to call it setState({ property : value })
 /* class Form extends Component{
    constructor(props){
        super(props);
        this.state = { inputVal : "", selectVal: "", textareaVal: "Please write something" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        switch(e.target.type){
            case "text":
                this.setState({ inputVal: e.target.value });
                break;
            case "textarea":
                this.setState({ textareaVal: e.target.value });
                break;
            case "select-one":
                this.setState({ selectVal: e.target.value });
                break;
        } 
        console.log(e.target.name)
    }
    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(this.form);
        formData.append("name", this.state.inputVal);
        formData.append("message", this.state.textareaVal);
        formData.append("select", this.state.selectVal);
        formData.forEach(item => console.log(item))
    }
    render(){
        return <form onSubmit={this.handleSubmit}>
                <label>
                    Name
                    <input type="text" value={this.state.inputVal} onChange={this.handleChange} />
                </label>
                <textarea value={this.state.textareaVal} onChange={this.handleChange}></textarea>
                <select value={this.state.selectVal} onChange={this.handleChange}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
                <button type="submit">Submit</button>
            </form>
    }
 }

 ReactDom.render( <Form />, document.getElementById('root'));  */

 // Exercise create Two Compnent form. 
 // The two Components refer at the same time to the same data
 function BoilingVerdict(props){
    const temperature = props.temp;
    let result = temperature >= 100 ? "The water would boil" : "The water would not boil";
    return <h2>{result}</h2>
}

class TempCalculator extends Component {
    constructor(){
        super();
        this.state = { tempValue: 0 }
        this.checkTemp = this.checkTemp.bind(this);    
    }
    checkTemp(e){
       this.setState({ tempValue : e.target.value })
    }
    render(){
        return <fieldset>
            <legend>Enter temperature in Celsius</legend>
            <input type="number" value={this.state.tempValue} onChange={this.checkTemp} />
            <BoilingVerdict temp={this.state.tempValue} />
        </fieldset>
    }
}

ReactDom.render( <TempCalculator />, document.getElementById('root'));