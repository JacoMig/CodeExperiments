import React, { useState, useEffect } from "react";
let cities = []

function InputField(props){
    const [inputVal, setInputVal] = useState('')
    
    /* useEffect( () => {
        console.log('<IputField /> Did Mount')
        return () => { console.log('<IputField /> Will Unmount')}
    }, [inputVal] )  */
    
    const re = new RegExp("^"+inputVal, "g")
    cities = props.locations.filter(location => { return re.test(location.name) }) 
    
    console.log('Render <IputField />')
    // console.log(cities.slice(0,20))
    
    return(
        <div>
            <input 
                type="text" 
                onChange={ (e) => { setInputVal(e.target.value); props.resetLocationName()  } } 
                value={   props.locationName !== null ? props.locationName : inputVal  }   
            />
            <ul>
               {    cities.length > 0 && 
                    inputVal !== '' && 
                    props.locationName === null && 
                    cities.slice(0,20).map(city => {
                        return  <li key={city.id} onClick={() => props.selectLocation(city)}>{city.name}, <span>{city.country}</span></li> 
                }) }
            </ul>
        </div>    
    )
}

export default InputField;
