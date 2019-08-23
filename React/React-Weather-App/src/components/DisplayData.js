import React from 'react';

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function DisplayData(props){
    const data = props.weatherData
    console.log("Render <DisplayData />")
    
    console.log(data)
    return(
        <div>
            <h2>City: {data.name}</h2>
            <p>Temperature <span>{Math.round(data.main.temp)}</span></p>
        </div>
    )
}


export default DisplayData