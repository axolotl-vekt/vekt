import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className='navBarContainer'>
        <ul className='navBarList'>
          <li className='navigationLinks'><Link to="/homepage" style={{textDecoration:'none', color:'white'}}><strong>Home</strong></Link></li>
          <li className='navigationLinks'><Link to="/about" style={{textDecoration:'none', color:'white'}}><strong>About</strong></Link></li>
          <li className='navigationLinks'><Link to="/contact" style={{textDecoration:'none', color:'white'}}><strong>Contact</strong></Link></li>
          <li className='navigationLinks'><Link to="/games" style={{textDecoration:'none', color:'white'}}><strong>Games</strong></Link></li>
          <li className='navigationLinks'><Link to="/" style={{textDecoration:'none', color:'white'}}><strong>Logout</strong></Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;