import React, { useState } from 'react';

function NewGame(props) {

    const letters = ['a','s','d','f','g','h','j','k','l','A','S','D','F','G','H','J','K','L'];
    const [typedLetter,setTypedLetter] = useState("");
    const [timer,setTimer] = useState(0);
    const [index,setIndex] = useState(0);
    const [keys,setKeys] = useState(0);
    const [started,setStarted] = useState(true);
    const generateIndex=()=>{
        var ind = Math.floor(Math.random() * (17 - 0 + 1) + 0);
        return ind;
    }
    const start = ()=>{
        setIndex(generateIndex);
        const clock = setInterval(()=>{
            setTimer(timer+1);
        },1000);
        // clock();
        const countdown = setTimeout(()=>{
            setStarted(false);
        },30000)
    }
    if(started){
    return (
        <div>
            <div><h2>{60-timer} seconds left</h2></div>
            <div><h1>{letters[index]}</h1></div>
            <div><input type='text' value={typedLetter} onChange={(e)=>setTypedLetter(e.target.value)}></input></div>
            <div><button onClick={start}>Start</button></div>
        </div>
    );
    }
    else{
        return(
            <h1>You pressed {keys} keys</h1>
        )
    }
}

export default NewGame;