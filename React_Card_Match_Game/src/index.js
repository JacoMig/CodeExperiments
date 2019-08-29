import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

class CardGame extends Component{
    constructor(){
        super();
        this.state = { start : false, gameWin: false }
    }
    render(){
        if( this.state.start && !this.state.gameWin ){
            return  <App ReStart={() => this.setState({start:false})} GameWin={ () => this.setState({gameWin:true}) } />
        }
        if( !this.state.start && !this.state.gameWin ){
            return <button onClick={() => this.setState({start:true, gameWin: false})}>Start Game</button>
        }
        if( this.state.gameWin ){
            return <div>
                        <h2>You won!</h2><button onClick={() => this.setState({start:true, gameWin: false})}>Start Game</button>
                    </div>
        }
    }
}

ReactDOM.render(<CardGame />, document.getElementById('app'))
