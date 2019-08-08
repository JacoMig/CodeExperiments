import React, {Component} from 'react'

const InputField = (props) => {
    if(props.type === "text"){
        return(
            <fieldset>
                <span>{props.name}:</span>
                <input 
                    type={props.type} 
                    ref={props.inputRef} 
                    onKeyUp={ props.onKeyUp } />
            </fieldset>
        )
    }else{
        return(
            <input 
                type={props.type} 
                ref={props.inputRef} 
                onClick={props.onClick}
                value={props.type} />
        )
    }
    
}

class RefsChildComponent extends Component{
    componentDidMount(){
        console.log("Component did mount and you can read the refs")
    }
    onClick(e){
        e.preventDefault()
        console.log(`You submitted ${this.firstName.value}, ${this.lastName.value} ${this.age.value} years old`)
    }
    onKeyUp(passed, e){
        e.preventDefault()
        if(e.keyCode == 13){
            switch(passed){
                case 'firstName':
                    this.lastName.focus()
                break;    
                case 'lastName':
                    this.age.focus()    
                break;    
                case 'age':
                    this.submit.focus()        
                break;    
                default: 
                this.submit.focus()
            }
        }
        console.log("On key up you passed an argument: "+passed)   
    }
    render(){
        return <div className="container">
            <InputField 
                inputRef = {  (input) => { this.firstName = input  } } 
                onKeyUp = { this.onKeyUp.bind(this, 'firstName') }
                name = "firstName"
                type = "text"
            />
            <InputField 
                inputRef = {  (input) => { this.lastName = input  } } 
                onKeyUp = { this.onKeyUp.bind(this, 'lastName') }
                name = "lastName"
                type = "text"
            />
            <InputField 
                inputRef = {  (input) => { this.age = input  } } 
                onKeyUp = { this.onKeyUp.bind(this, 'age') }
                name = "age"
                type = "text"
            />
            <InputField 
                inputRef = {  (input) => { this.submit = input  } } 
                onKeyUp = { this.onKeyUp.bind(this, 'submit') }
                onClick = {this.onClick.bind(this)}
                name = "submit"
                type = "submit"
            />
        </div>
    }
}

export default RefsChildComponent


//  ref={ (input_value) => { this.ourVar = input_value  } }
//  The refs callback is called before the component is mounted 

