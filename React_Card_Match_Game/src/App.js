import React, { Component } from 'react'

let checkers = [] 
let completed = []
let isMatch = false
const images = {
    angular: "img/angular.png",
    css: "img/css.png",
    go: "img/go.png",
    html: "img/html.png",
    rail: "img/rail.png",
    react: "img/react.png",
    scala: "img/scala.png",
    vue: "img/vue.png"
}

const buildCards = () => {
    const Cards = [];
    let id = 0;

    const duplicateCards = (images) => {
        for(var name in images){
            const imageurl = images[name]
            id++
            Cards.push(
                {
                    id: id,
                    front_img: imageurl,
                    back_img: 'img/back.png',
                    flipped: false,
                    type: name
                }
            )
        }
    }
    duplicateCards(images)
    duplicateCards(images)
   
    Cards.sort(() =>  Math.random() - 0.5 )

    return Cards;
}

const RenderCards = (props) => {
    const { front_img, back_img, flipped, id, type } = props.card
    const img_src = flipped ? front_img : back_img;
     
    return <div className="Card" data-flipped={flipped} data-type={type} id={id} key={id} onClick={props.clickHandler} >
                <img src={img_src} />
            </div>
}

class App extends Component{
    constructor(){
        super()
        this.state = ({
            Cards: buildCards()
        })
    }
    
    
    clickHandler(e){
        e.preventDefault()
        const Cards = this.state.Cards;
        const Id = e.target.parentNode.id;
        let newCards = Cards;
        const currentCard = newCards.find( (el) => el.id == Id );
        
        if(checkersFull(checkers) || cardAlreadyMatched(Cards, completed) ) return
        
        console.log("init click handler")
       
        currentCard.flipped = true
        checkers.push(currentCard);
        this.setState({ Cards: newCards }) 
        
        if(validateCheckers(checkers)){
            isMatch = true
            if(!cardAlreadyMatched(Cards, completed))
                completed.push(checkers[0].type)
        }else{
            isMatch = false
        }

        function checkersFull(checkers){
            return checkers.length === 2
        }

        function validateCheckers(checkers){
            return checkers.length === 2 && checkers[0].type === checkers[1].type
        }

        function cardAlreadyMatched(cards, completed){
            return completed.includes(currentCard.type)
        }  

       
        if(checkers.length >= 2){
            checkers = []
        }
        
        setTimeout( () => {
            if(!isMatch){
                currentCard.flipped = false;
                this.setState({ Cards: newCards });
                checkers = []
            }
        }, 1000 )   
        

        console.log("Is Match: "+isMatch)

    }

    render(){
        return (
            <div>
                { this.state.Cards.map((card) => <RenderCards key={card.id}  card={card} clickHandler={this.clickHandler.bind(this)} />) }    
            </div>
        )
    }
}

export default App