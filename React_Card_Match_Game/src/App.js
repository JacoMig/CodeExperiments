import React, { Component, Fragment } from 'react'
import ReactCardFlip from 'react-card-flip'
import Timer from './components/Timer'
import GridCards from './components/GridCards'

let checkers = [] 
let completed = []
let isMatch = false
let isMounted = false
let click = 0;
const images = {
    angular: "img/angular.png",
    css: "img/css.png",
    go: "img/go.png",
   /*  html: "img/html.png",
    rail: "img/rail.png",
    react: "img/react.png",
    scala: "img/scala.png",
    vue: "img/vue.png" */
}

const buildCards = () => {
    const Cards = [];
    let id = 0;

    const createCards = (images) => {
        for(var name in images){
            const imageurl = images[name]
            id++
            Cards.push(
                {
                    id: id,
                    back_img: imageurl,
                    front_img: 'img/back.png',
                    flipped: false,
                    type: name
                }
            )
        }
    }
    createCards(images)
    createCards(images)
   
    Cards.sort(() =>  Math.random() - 0.5 )

    return Cards;
}



const RenderCard = (props) => {
    const { front_img, back_img, id, type } = props.card
    return <ReactCardFlip   isFlipped={props.flipped} flipDirection="horizontal">
        <div 
            className="Card back" 
            data-type={type} 
            id={id} 
            key="back" 
            onClick={(e) => { props.clickHandler(e) }} >
            <img src={back_img} />
        </div>
        <div 
            className="Card front" 
            data-type={type} 
            id={id} 
            key="front" 
            onClick={(e) => { props.clickHandler(e) }} >
            <img src={front_img} />
        </div>
    </ReactCardFlip>
}

class App extends Component{
    
    constructor(props){
        super(props)
        this.state = ({
            Cards: buildCards()
        })
    }
    
    componentDidMount(){
        isMounted = true
        completed = []
        isMatch = false
    }

    componentWillUnmount(){
        isMounted = false
    }

    clickHandler(e){
        e.preventDefault()
        // const Cards = this.state.Cards;
        const Id = e.target.parentNode.id;
        let newCards = this.state.Cards;
        const currentCard = newCards.find( (el) => el.id == Id );
        
        if(checkersFull(checkers) || cardAlreadyMatched(currentCard, completed) || click >= 2) return
        
        console.log("INIT CLICK HANDLER")
        
        click++
        currentCard.flipped = true
        checkers.push(currentCard);
        this.setState({ Cards: newCards }) 
        
        // VALIDATE CHOOSEN CARDS and SET A MATCH IF NEEDED
        if(validateCheckers(checkers)){
            isMatch = true
            if(!cardAlreadyMatched(currentCard, completed))
                completed.push(checkers[0].type)
         }else{
            isMatch = false
        }

        if(checkers.length >= 2){
            // CHECK IF IS A MATCH
            setTimeout( () => {
                if(!isMatch && isMounted){
                    this.state.Cards.map(card => { 
                        if(!completed.includes(card.type))
                            card.flipped = false
                    })
                    this.setState({ Cards: newCards });
                }
                click = 0
            }, 1000 )   
            console.log("Is Match: "+isMatch)
            checkers = []
        }
        
        // WIN 
        if(completed.length === Object.entries(images).length ){
            this.props.GameWin() 
            isMounted = false
            console.log('game won')
        }

        function checkersFull(checkers){
            return checkers.length === 2
        }

        function validateCheckers(checkers){
            return checkers.length === 2 && checkers[0].type === checkers[1].type
        }

        function cardAlreadyMatched(currentCard, completed){
            return completed.includes(currentCard.type)
        } 

    }

    render(){
        return (
            <Fragment>
                <Timer ReStart={this.props.ReStart}></Timer>
                <GridCards>
                { this.state.Cards.map((card) => <RenderCard 
                                                    key={card.id} 
                                                    flipped={card.flipped} 
                                                    card={card} 
                                                    clickHandler={this.clickHandler.bind(this)} />) }    
                </GridCards>
            </Fragment>
        )
       
    }
}

export default App