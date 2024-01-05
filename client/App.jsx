import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import FoodLog from './components/FoodLog';
import Games from './components/Games';
import MemoryGame from './components/MemoryGame';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<LandingPage />} />
      <Route exact path='/homepage' element={<Homepage />} />
      <Route exact path='/signin' element={<Login />} />
      <Route exact path='/signup' element={<SignUp />} />
      <Route exact path='/foodlog' element={<FoodLog />} />
      <Route exact path='/games' element={<Games />}/>
      <Route exact path='/memoryGame' element={<MemoryGame />} />
      <Route exact path='/about' element={<About />} />
      <Route exact path='/contact' element={<Contact />} />
    </Routes>
  );
}

export default App;
