import React, { Component } from 'react'
import {connect} from "react-redux";

class App extends Component{
  /* constructor(props){
    super(props);
    this.state = { age : 21 }
  }
  
  handleClick(e) {
    e.preventDefault();
    const target = e.target
    const { name } = target;
    this.setState({ age : name === "upgrade" ? this.state.age+1 : this.state.age-1 })
    
  } */
  
  render(){
    return <div>
          <h1>Hello My age is {this.props.age}</h1>
          <button name="upgrade" onClick={ this.props.upgrade}>Upgrade my age</button>
          <button name="downgrade" onClick= {this.props.downgrade}>Downgrade my age</button>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    age: state.age
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    upgrade: () => dispatch({type : 'upgrade'}),
    downgrade: () => dispatch({type : 'downgrade'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);