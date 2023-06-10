import React, { useEffect, useMemo, useState } from "react";
const text =
  ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet tellus tortor. ","Alaska fadla skalaks alakalalks aakjsll jaaska kas laads dasaddla has a kalls.","Hajj had a sad flask of gashad salk, fad lash, ald fakh jags;","Saaglsa lassa hssfa sad falls, gasasl lassdla ghaas hasdas lashaad jhas.","A shad fakdjghlkj gask flashd as a jaggd shalk sanh, fjhglkasd hadj gkjlghf.","Skaldjfhg agd jghsadkfh dashd aff, half-flask, half-joks, daskjhf gkdfjlgashf kjghdalsfkj.","Fjasd flash, fjghasldk gjfsdhal, a flask af ask, fdghjalskdf as fjghaklfdsj a flash of jglkdhfjasd laghs","A jaggad flash af gas, hajjaskldfgh; a sad jghlfdakj, as flasks dashadd, dghalskfj ghakljdf"]

export default function Game() {
  const [currIndex,setCurrIndex] = useState(0);
  const [textToType,settextToType] = useState(text[currIndex]);
  const [typedText, setTypedText] = useState("");
  const [timer, setTimer] = useState();
  const [elapsedMs, setElapsedMs] = useState(0);
  const [started, setStarted] = useState(true);
  const [wpm, setWpm] = useState(0);
  const [mismatch,setMismatch] = useState(false);
  const [miscount,setmiscount] = useState(0)
  

  const parts = useMemo(() => {
    const splitTextToType = textToType.split("");
    let endIndexMatch = 0;
    for (const [index, s] of splitTextToType.entries()) {
      // console.log("Called")
      // console.log(index, " ", s, " texttotypr = ",typedText[index]);
      if (s !== typedText[index]) {
        if(index<typedText.length){
          setMismatch(true);
          setmiscount(miscount+1);
        }
        endIndexMatch = index;
        break;
      }
      else{
        if(index === typedText.length-1)
        setMismatch(false);
      }
    }
    return {
      matchedPart: textToType.slice(0, endIndexMatch),
      unmatchedPart: textToType.slice(endIndexMatch)
    };
  }, [textToType, typedText]);

  const start = () => {
    const timer = setInterval(() => {
      setElapsedMs((elapsedMs) => elapsedMs + 1);
    }, 1000);
    setTimer(timer);
    //countdown to 5 minutes
    const countdown = setTimeout(()=>{
      setStarted(false);
    },30000);
  };

  const restart = () => {
    setStarted(true);
    setElapsedMs(0);
    // settextToType("");
  };

  useEffect(() => {
    if (parts.unmatchedPart.length === 1) {
      // clearInterval(timer);
      // setWpm(textToType.split(" ").length / (elapsedMs / (60 * 1000)));
      // console.log("Before curr="+currIndex);
      var curr = (currIndex+1)%text.length;
      // console.log("After opera = "+curr);
      setCurrIndex(curr);
      // console.log("changed curr to "+currIndex);
      settextToType(text[curr]);
      // console.log("changed text to "+textToType);
      setTypedText("");
    }
  }, [typedText]);

  if (started) {
    return (
      <div style={{textAlign:"center"}}>
      <h3>
        {300-elapsedMs} seconds left<br/>
      </h3>
        <h1>
          <span style={{color:"lime"}}>{parts.matchedPart}</span>
          <span style={{color:mismatch?"red":"black"}}>{parts.unmatchedPart}</span>
        </h1>
        <div>
        <textarea
          disabled={!started}
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
          style={{ width: "93vw", height: "60px", fontSize:"20px"}}
        ></textarea></div>
        <div>
        <button style={{width:"200px"}} onClick={start}>start</button>
        </div>
      </div>
    );
  } else {
    return (
      <h1>
        Your words per minute is {wpm}
        <button onClick={restart}>restart</button>
      </h1>
    );
  }
}