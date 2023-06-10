import React,{useState,useEffect} from 'react';
import { Outlet, Link } from "react-router-dom";
function Home(props) {
    const [text, setText] = useState("")
    const [fullText, setFullText] = useState(
        "Are you a slow typer......Well don't you worry cause you are at the right place."
    )
    const [index, setIndex] = useState(0)
    const [show,setShow] = useState(false);
    useEffect(() => {
        if (index < fullText.length) {
          setTimeout(() => {
            setText(text + fullText[index])
            setIndex(index + 1)
          }, 40)
        }
        if(index==fullText.length)
        setShow(true);
      }, [index])
    
    return (
        <div id='main'>
        <h1>{text}</h1>
        <Link to={'/game'}><button style={{opacity:show?'1':'0'}} className='homebutton'>Key Press Game</button></Link>
        <Link to={'/sengame'}><button style={{opacity:show?'1':'0'}} className='homebutton'>Sentence Game</button></Link>
        </div>
    );
}

export default Home;