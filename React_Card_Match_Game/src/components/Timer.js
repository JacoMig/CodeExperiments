import React, { useState, useEffect } from 'react'
import {H2} from './Typography'

export default (props) => {
    const total = 10;
    /* const [min, setMin] = useState(Math.floor(total / 60))
    const [sec, setSec] = useState(total / 2)     */
    const [min, setMin] = useState(2)
    const [sec, setSec] = useState(total/2)    
    
    useEffect(() => {
        // console.log('Effect start')
        let timer;
        if( sec === 0 && min === 0 ){
            // console.log('Restart')
            props.ReStart();
            //clearTimeout(timer)
        }else{
            timer = setTimeout( () => {
                if( min > 0 && sec <= 1){
                    setMin(prevState => prevState-1)
                    setSec(total/2)
                }else{
                    setSec( prevState => prevState - 1)
                }
                // console.log('Time is running')
                
            }, 1000)
        }    
        return () => { 
            // console.log('Effect ends')
            clearTimeout(timer)
        }
    })

    return(
        <H2>{min} : {sec}</H2>
    )
}