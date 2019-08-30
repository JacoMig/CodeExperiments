import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Button from './components/Button'
import Container from './components/Container'
import { createGlobalStyle } from "styled-components"
import {H2, H1} from './components/Typography'

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Notable');
    font-family: 'Notable', sans-serif;
  }
`

class CardGame extends Component{
    constructor(){
        super();
        this.state = { start : false, gameWin: false }
    }
    render(){
        return <Container>
                <GlobalStyles />
                <H1 green>React Memory Game</H1>
                { !this.state.start && !this.state.gameWin &&
                    <Button 
                        primary 
                        onClick={() => this.setState({start:true, gameWin: false})}>
                        Start Game
                    </Button>
                }
                { this.state.start && !this.state.gameWin &&
                    <App 
                        ReStart={() => this.setState({start:false})} 
                        GameWin={ () => this.setState({gameWin:true}) } />
                }
                { this.state.gameWin && 
                    <div>
                        <H2>You won!</H2>
                        <Button 
                            onClick={() => this.setState({start:true, gameWin: false})}>
                            ReStart Game
                        </Button>
                    </div>
                }
            </Container>
        
    }
}

ReactDOM.render(<CardGame />, document.getElementById('app'))
