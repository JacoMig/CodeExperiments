import React, { Component} from "react";
import axios from "axios";
import "./App.scss";

class App extends Component{
    constructor(){
        super();
            this.state={ endpoint : "http://dataservice.accuweather.com/currentconditions/v1/2541071?details=true&apikey=PE9lc5o54u9v3ABMb35P4sGQHjmb7b6p",
        }
    }
    componentDidMount(){
       fetch(this.state.endpoint)
       .then(res => res.json())
       .then(response => console.log(response))
       .catch(error => console.error('Error:', error));
    }  
    render(){
        return(
        <div className="App">
            <h1> Hello</h1>
        </div>
        );
    }
}

export default App;