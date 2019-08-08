import React, { Component } from "react";
import ReactDom from "react-dom";


/* import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-grid.css"; */
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


///////////////////////////////////////////////////////////////////////////


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


///////////////////////////////////////////////////////////////////////////


// CLOCK COMPONENT
/* 
import Clock from "./components/Clock";
const App = () => {
    return (
        <Clock />
    )
}

ReactDom.render( <App />, document.getElementById('root') )   */



/////////////////////////////////////////////////////////////////////////// 


// EVENT HANDLERS
/* 
import EventHandler from "./components/EventHandler";
const App = () => {
    return (
        <EventHandler />
    )
}
ReactDom.render(<App />, document.getElementById('root')); 
 */


///////////////////////////////////////////////////////////////////////////


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

///////////////////////////////////////////////////////////////////////////

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


///////////////////////////////////////////////////////////////////////////


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


///////////////////////////////////////////////////////////////////////////

 // FORMS
 // INPUT, TEXTAREA and SELECT Tag all works very simliar in React
 // We create 2 methods
 // 1. Update the initial state and 2. We submit the form.
 // IMPORTANT setState is a method so you have to call it setState({ key : value })
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


///////////////////////////////////////////////////////////////////////////

 // Exercise create Two Component form. 
 // The two Components refer at the same time to the same data
 // Lifting State Up Practice, little complicated for now
/* const scales = {
    c : "celsius",
    f : "fahrenheit"
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props){
    const temperature = props.temp;
    let result = temperature >= 100 ? "The water would boil" : "The water would not boil";
    return <h2>{result}</h2>
}

class TemperaturInput extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);    
    }
    handleChange(e){
      this.props.onTemperaturChange(e.target.value);
    }
    render(){
        const temperature = this.props.temperature;
        return  <fieldset>
            <legend>Enter temperature in {scales[this.props.scale]}</legend>
            <input type="number" value={temperature} onChange={this.handleChange} />
        </fieldset>
    }
}


class TempCalculator extends Component {
    constructor(props){
        super(props);
        this.state = {temperature: '', scale: 'c'};
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }
    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }
    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }
    render(){
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsiusTemperature = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheitTemperature = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return <div>
            <TemperaturInput scale="c" temperature={celsiusTemperature} onTemperaturChange={this.handleCelsiusChange}/>
            <TemperaturInput scale="f" temperature={fahrenheitTemperature} onTemperaturChange={this.handleFahrenheitChange} />
            <BoilingVerdict temp={celsiusTemperature} />
            </div>
        
    }
}

ReactDom.render( <TempCalculator />, document.getElementById('root')); */

///////////////////////////////////////////////////////////////////////////



// Another Lifting State Up Exercise
// The main Component CounterContainer handles the click event and pass the props to the child
/* class ClickCounter extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const count = this.props.count;
        const onClickCounting = this.props.onClickCounting;
        return <div>
            <p>You have clicked {count} times</p>
            <button onClick={onClickCounting}>Click to increment</button>
        </div>
    }
}

class CounterContainer extends Component{
    constructor(props){
        super(props);
        this.state = { count : 0 }
        this.onClickCounting = this.onClickCounting.bind(this);
    }
    onClickCounting(){
        console.log("click")
        this.setState(prevState => { 
            return { count : prevState.count+1 }
        })
    } 
    render(){
        return  <div>
            <ClickCounter count={this.state.count} onClickCounting={this.onClickCounting} />
        </div>
    }
}

ReactDom.render( <CounterContainer />, document.getElementById('root'));  */


///////////////////////////////////////////////////////////////////////////

// setState Exercise
/* class FormExercise extends Component{
    constructor(props){
        super(props);
        this.state = { 
            firstName : "", 
            lastName : "", 
            count : 0,
            isValid : false
        }
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.handleValidateInfo = this.handleValidateInfo.bind(this);
        this.handleCounter = this.handleCounter.bind(this);
    }
    handleChangeForm(e){
        // In ES6, when you create an object literal {} 
        // and you wrap the object’s key in array brackets [key] 
        // you can dynamically set that key.
        
       // const { checked, name, value, type  } = e.target;
        const { name, value  } = e.target;
        // const valueToUpdate = type === 'checkbox' ? checked : value;
        // [name] : valueToUpdate
        this.setState({ 
            [name] : value
        }, () => this.handleCounter() );
        
    }
    handleCounter(){
        this.setState({ count : this.state.count+1 });
    } 
    handleValidateInfo(e){
        this.setState({ isValid : !this.state.isValid });
        this.handleCounter();
    }
    render(){
        const validateText = this.state.isValid ? "Invalidate" : "Validate"
        return <div className="Home text-center mt-3 container">
            <h2>Set State in React</h2>
            <h3>by Sto Cazzo</h3>
            <div className="my-3">
                <h3>User Info:</h3>
                <div>First Name: { this.state.firstName }</div>
                <div>Last Name: { this.state.lastName }</div>
                <div>The info is Valid: { this.state.isValid ? 'yes' : 'no' }</div>
                <div>The state was updated { this.state.count } times</div>
            </div>
            <div className="my-3">
                <h5>Form</h5>
                <div className="form-group">
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input className="ml-2" value={ this.state.firstName } name="firstName" onChange={ this.handleChangeForm } />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input className="ml-2" value={ this.state.lastName } name="lastName" onChange={ this.handleChangeForm } />
                    </div>
                    <div>
                        <label>The Info is valid
                            <input type="checkbox" checked={ this.state.isValid } name="isValid" onChange={ this.handleValidateInfo }/>
                         </label>   
                    </div> 
                    <div>
                        <button onClick={this.handleValidateInfo} className={ this.state.isValid ? "btn-warning" : "btn-success" }>{validateText}</button>
                    </div>
                </div>
            </div>
        </div>
    }
}

ReactDom.render( <FormExercise />, document.getElementById('root')); */


///////////////////////////////////////////////////////////////////////////


// FRAGMENT
/* import { Fragment } from "react"
    const Temp = () =>{
    return ( 
        <Fragment>
            <div key="1">Hi</div>
            <div key="2">Hello</div>
        </Fragment>
    )
}

// You can render the same way, wrapping the output inside an array 
// [
//    <div key="1">Hi</div>,
//    <div key="2">Hello</div>
// ] 

const App = () => {
    return <div className="App">
            <Temp />
        </div>
} 
    
ReactDom.render( <App />, document.getElementById('root') ) */


///////////////////////////////////////////////////////////////////////////


// COMPONENT LIFECYCLE
/* import Child from "./components/child"
class App extends Component {
    constructor(){
        super()
        this.state = {
            name: "John"
        }
        console.log("constructor") // 1. 
    }
    componentWillMount(){ // 2.
        // you can already set the state, before the component has not been rendered
        // if you want to do something with global like document or window
        // This Hook happens on the SERVER SIDE
        if(window.innerWidth < 500){
            this.setState({ innerWidth : window.innerWidth }, 
                () => {console.log(this.state.innerWidth)})
        }
        console.log("componentWillMount")
    }
    shouldComponentUpdate(nextProps, nextState){ // 3.
        console.log("shouldComponentUpdate")
        return true
    }
    componentWillUpdate(){ // 4.
        console.log("componentWillUpdate")
    }
    render(){  // 5.
        console.log("render")
        if(this.state.name === "Robert"){
            return <div></div>
        }else{
            return <div className="App text-center">
                <p>Name: {this.state.name}</p>
                <p>Width: {this.state.innerWidth}</p>
                <Child name={this.state.name} />
                <button onClick={() => { this.setState({ name : "Mario" }) } }>Change name</button>
                <button onClick={() => { this.setState({ name : "Robert" }) } }>Unmount Component</button>
            </div>
        }
    }
    componentDidUpdate(){ // 6.
        console.log("componentDidUpdate")
    }
    componentWillUnmount(){ // 7.
        console.log("componentWillUnmount")
    }
    componentDidMount(){ // 8.
        console.log("componentDidMount")
    }
}

ReactDom.render( <App />, document.getElementById('root') ) */

///////////////////////////////////////////////////////////////////////////


// REFS & DOM
/* import RefsChildComponent from "./components/RefsChildComponent"

const App = () => {
    return (
        <RefsChildComponent />
    )
}

ReactDom.render( <App />, document.getElementById('root') ) */


///////////////////////////////////////////////////////////////////////////

// REACT & REDUX
// import App from "./App";
// Provider allows to inject the reducer globally
/* import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducer";

const store = createStore(reducer);

ReactDom.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'))
 */