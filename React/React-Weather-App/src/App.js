import React, { useState, useEffect } from "react";
import InputField from "./components/InputField";
import DisplayData from "./components/DisplayData";

const apiKey = 'af5b92fe47ecfc817ce77996ee7634b3';
const weatherEndpoint = 'http://api.openweathermap.org/data/2.5/weather?appid='+apiKey+'&units=metric';
const cityListJson = './city.list.json'

function App(){
    const [locationId, setlocationId] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [locations, setLocations] = useState([])
    const [data, setData] = useState({})
    
    useEffect( () => {
        if(locationId === null){
            console.log('Start fetch cities from <App />')
            fetch(`${cityListJson}`)
            .then(res => res.json())
            .then(response => { setLocations(response); console.log('fetched cities from <App />') } )
            .catch(error => console.error('Error:', error)); 
        }else{
            console.log('Start fetch weather data')
            fetch(`${weatherEndpoint}&id=${locationId}`)
            .then(res => res.json())
            .then(response => { setData(response); console.log('fetched weather data from <App />') } )
            .catch(error => console.error('Error:', error)); 
        }
    }, [locationId]) 

    console.log('render <App />')

    if(locations.length === 0){
        return <div>Loading Component...</div>
    }else{
        return( <div>
            <p>Hello Weather</p>
            <InputField 
                locations={locations} 
                locationName={locationName}
                resetLocationName={() => setLocationName(null)}
                selectLocation={ (city) => { 
                        setlocationId(city.id); 
                        setLocationName(`${city.name}, ${city.country}`)
                    } 
                } 
            />
            { Object.entries(data).length > 0 && <DisplayData weatherData={data} />}
        </div>
        )
    }    

   
}

export default App;