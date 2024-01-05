import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Games() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="oneGame">
          <Link to="/memoryGame" style={{ textDecoration: 'none' }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShO_FzDYXTDoqp5X8aC-51mOEyJ1AqaM6ypg&usqp=CAU"
              alt=""
              style={{ width: '250px' }}
            />
            <p className="memoryGame">Memory Game</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Games;
