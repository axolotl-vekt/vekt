import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    data.preventDefault();

    if ('' === password) {
      setPasswordError('Please enter a password');
    }

    if (password.length < 4) {
      setPasswordError('The password must be 4 characters or longer');
    }

    try {
      const reqOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, firstName, lastName }),
      };

      const reponse = await fetch('/api/signup', reqOpts);
      const data = await reponse.json();

      if (data.verified === 'username') {
        setUserNameError('Sorry, Username is taken');
      }

      if (data.verified === true) {
        console.log('login success');
        navigate('/homepage');
      }
    } catch (error) {
      console.log('err getting database');
    }
  };

  return (
    <div className="auth-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {userNameError && <div className="error"> {userNameError} </div>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {passwordError && <div className="error"> {passwordError} </div>}
        <button type="submit">Register</button>
      </form>
      <Link to="/login">
        <button className="link-btn">
          I made a terrible mistake, I have an account!
        </button>
      </Link>
    </div>
  );
}

export default SignUp;
