import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import FoodLog from './components/FoodLog';
import User from './components/User';
import MemoryGame from './components/MemoryGame';
import About from './components/About'
import Contact from './components/Contact'

//add testing

function App() {
  return (
    
    <Routes>
      
      <Route exact path='/' element={<Login />} />
      <Route exact path='/homepage' element={<Homepage />} />
      <Route exact path='/signup' element={<SignUp />} />
      <Route exact path='/foodlog' element={<FoodLog />} />
      <Route exact path='/user' element={<User />}/>
      <Route exact path='/memoryGame' element={<MemoryGame />} />
      <Route exact path='/about' element={<About />} />
      <Route exact path='/contact' element={<Contact />} />
      <Route exact path='/getUser' element={<User />} />
      <Route exact path='/updateUser' element={<User />} />
    </Routes>
  );
}

export default App;
