import React, { Component } from 'react'

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
                    front_img: imageurl,
                    back_img: 'img/back.png',
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



const RenderCards = (props) => {
    const { front_img, back_img, flipped, id, type } = props.card
    const img_src = flipped ? front_img : back_img;
    return <div className="Card" data-flipped={flipped} data-type={type} id={id} key={id} onClick={props.clickHandler} >
                <img src={img_src} />
            </div>
}

class App extends Component{
    
    constructor(props){
        super(props)
        this.state = ({
            Cards: buildCards(),
            timer: { min: 2, sec: 60 }
        })
    }
    
    componentDidMount(){
        isMounted = true
        completed = []
        isMatch = false

        var countDown = setInterval( () => {
            if(isMounted){
                if( this.state.timer.min > 0 && this.state.timer.sec === 1)
                    this.setState({timer : { min: this.state.timer.min-=1 , sec: 60 } })
                else    
                    this.setState({timer : { min: this.state.timer.min,  sec: this.state.timer.sec-=1 } })
                if( (this.state.timer.min === 0 && this.state.timer.sec === 0) ){
                    this.props.ReStart()
                    isMounted = false
                }
            }else{
                clearInterval(countDown)
            }
        }, 1000)
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
            <div>
                <div className="timer">{this.state.timer.min}:{this.state.timer.sec}</div>
                <div className="gridCards">
                { this.state.Cards.map((card) => <RenderCards key={card.id}  card={card} clickHandler={this.clickHandler.bind(this)} />) }    
                </div>
            </div>
        )
       
    }
}

export default App