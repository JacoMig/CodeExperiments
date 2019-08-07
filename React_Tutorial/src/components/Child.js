import React, {Component} from "react"

class Child extends Component {
    constructor(){
        super()
        console.log("child constructor") // 1. 
    }
    componentWillMount(){ // 2.
        console.log("child componentWillMount")
    }
    shouldComponentUpdate(nextProps, nextState){ // 3.
        console.log("child shouldComponentUpdate")
        console.log("child nextProps: "+JSON.stringify(nextProps)+" / child nextState: "+nextState)
        return true
    }
    componentWillUpdate(){ // 4.
        console.log("child componentWillUpdate")
    }
    render(){  // 5.
        console.log("child render")
        // This is a good place to make an AJAX Call
        return <p>Child Name: {this.props.name}</p>
                
    }
    componentDidUpdate(prevProps, prevState){ // 6.
        console.log("child componentDidUpdate")
        console.log("child prevProps: "+JSON.stringify(prevProps)+" / child prevState: "+prevState)
    }
    componentWillUnmount(){ // 7.
        console.log("child componentWillUnmount")
    }
    componentDidMount(){ // 8.
        console.log("child componentDidMount")
    }
}

export default Child