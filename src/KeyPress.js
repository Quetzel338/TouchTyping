import React, { useEffect, useState } from 'react';

function KeyPress(props) {
    const letters = ['a','s','d','f','g','h','j','k','l','A','S','D','F','G','H','J','K','L'];
    const[typedText, setTypedText] = useState("");
    const [start, setStart] = useState(true);
    const [currIndex, setcurrIndex] = useState();
    const [keys, setKeys] = useState(0);
    const [secPassed, setSecPassed] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(30);
    const [correct, setCorrect] = useState(true);
    const [mistake, setMistake] = useState(0);
    

    const gamestart=()=>{
        setStart(true);
        const i = generateIndex();
        setcurrIndex(i);
        const timer = setInterval(()=>{
            setSecPassed(prevSecPassed => prevSecPassed + 1);
        },1000);
        const countdown = setTimeout(()=>{
            setStart(false);
        },totalSeconds*1000);

    }

    useEffect(()=>{
        console.log("Typed text changed to "+typedText);
        if(typedText === letters[currIndex]){
            setCorrect(true);
            setKeys(keys+1);
            setcurrIndex(generateIndex());
            setTypedText("");
        }
        else{
            if(typedText !== ""){
            setMistake((m)=>m+1);
            setCorrect(false)
            }
        }
    },[typedText])
    const handleInput = (e)=>{
        setTypedText(e.target.value);
    }
    const generateIndex=()=>{
        var ind = Math.floor(Math.random() * (17 - 0 + 1) + 0);
        return ind;
    }
    // const setTimer=()=>{
    //     var t=totalSeconds === 30?60:30;
    //     setTotalSeconds(t);
    // }
    if(start)
    return (
        <div id='game'>
            <div><h2 id='time'>{totalSeconds - secPassed}</h2></div>
            <div>
                <div id='keyBoard'>
                    {letters.map((letter,ind)=>{
                        var isActive=false;
                        if(currIndex === ind)
                        isActive=true;
                        return(
                            <button key = {ind} style={{backgroundColor:isActive?!correct?"rgba(255, 3, 3, 0.835)":"rgba(0, 255, 0, 0.812)":"", color:isActive?"black":"", boxShadow:isActive?'2px 2px 5px white':''}} className='keys'>{letter}</button>
                        )
                    })}
                </div>
            </div>
            <div>
                <input type='text' value={typedText} onChange={handleInput}></input>
            </div>
            <div><button id='start' onClick={gamestart}>Start</button></div>
        </div>
    );
    else{
        return(
            <div id='result'>
                <h3>Well Done !</h3>
                <h1>You have pressed {keys} keys in {totalSeconds} seconds </h1>
                <h2>Your accuracy was {Math.round(((keys-mistake)/keys)*100)} %</h2>
            </div>
        )
    }
}

export default KeyPress;