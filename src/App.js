import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from "./pages/loading"
import HowToPlay from './pages/how-to-play';
import AboutGame from './pages/about-game';
import JoinGame from './pages/join-game';
import Home from './pages/home';

const SERVER_EMPTY = 0; //server is currently empty, no players have joined. Waiting...
const SERVER_WAITING = 1; //server is not empty (a player has joined), but the game has not started.
const SERVER_FULL = 2; //server is full, but the game has not started
const SERVER_GAME_STARTED = 3; //server is full and the game has started.
const SERVER_GAME_EMPTY = 4; //server is full and the game has started



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> }></Route>
          <Route path="/loading" element={ <Loading /> }></Route>
          <Route path="/how-to-play" element={ <HowToPlay />}></Route>
          <Route path="/about-game" element={ <AboutGame />}></Route>
          <Route path="/join-game" element={ <JoinGame />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
