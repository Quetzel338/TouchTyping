import './App.css';
import KeyPress from './KeyPress';
import Home from './Home';
import ReactDOM from "react-dom";
import Game from './Game'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<KeyPress />} />
        <Route path="/sengame" element={<Game/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
