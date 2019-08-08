import React, { Component } from 'react'

const checkers = [] 

const images = {
    angular: "img/angular.png",
    css: "https://github.com/chiquyet199/memory-game/blob/master/src/assets/images/css.png",
    go: "https://github.com/chiquyet199/memory-game/blob/master/src/assets/images/go.png",
    html: "https://github.com/chiquyet199/memory-game/blob/master/src/assets/images/html.png",
    rail: "https://github.com/chiquyet199/memory-game/blob/master/src/assets/images/rail.png",
    react: "https://github.com/chiquyet199/memory-game/blob/master/src/assets/images/react.png",
    scala: "https://github.com/chiquyet199/memory-game/blob/master/src/assets/images/scala.png",
    vue: "https://github.com/chiquyet199/memory-game/blob/master/src/assets/images/vue.png"
}

const buildCards = () => {
    const Cards = [];
    let id = 0;
  /*   const hello = Object.entries(images).reduce((acc, curr) => {
        return acc.concat([curr, curr])
    }, [] ) */

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
   
    
    return Cards;
}

const RenderCards = (props) => {
    const { front_img, back_img, flipped, id, type } = props.card
    const img_src = flipped ? front_img : back_img; 
    
   /*  const  clickHandler = (e) => {
        console.log(e.target.parentNode.id)
    } */
    
    return <div className="Card" data-type={type} id={id} key={id} onClick={props.clickHandler} >
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
        const clickedImgId = e.target.parentNode.id
        const result = this.state.Cards.filter( card => card.id === parseInt(clickedImgId) )
        checkers.push(result[0])
        if(checkers.length > 1){
            checkers.reduce((acc, curr) => {
                console.log(acc.type === curr.type)
            })
        }
    }
    render(){
        return <div>
            { this.state.Cards.map((card) => <RenderCards card={card} clickHandler={this.clickHandler.bind(this)} />) }    
        </div>
    }
}

export default App