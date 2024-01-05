import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import style from '../login.styles.css'

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=> login: ', username, password);

    if ('' === password) {
      setPasswordError('Please enter a password');
    }

    if (password.length < 4) {
      setPasswordError('The password must be 4 characters or longer');
    }

    try {
      const loginInfo = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      };

  
      console.log("=> Inside Login.jsx try")

      const reponse = await fetch('/api/signin', loginInfo);
      const data = await reponse.json();
      console.log('=> data af Login.handleSubmit', data);

      if (data.verified) {
        console.log('login success');
        navigate('/homepage');
      }
    } catch (error) {
      console.log('err sending post request', error);
    }
  };

  return (
    <div className="auth-form-container" style={{ transitionDelay: '100ms' }}>
      <a href="https://imgur.com/6CMrUbD"><img src="https://i.imgur.com/6CMrUbD.png" title="source: imgur.com" /></a>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className={'inputBox'}
        />
        {userNameError ? (
          <div className="error"> {userNameError} </div>
        ) : (
          ''
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className={'inputBox'}
        />
        {passwordError && password.length <= 4 ? (
          <div className="error"> {passwordError} </div>
        ) : (
          ''
        )}
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">
        <button className="link-btn">No account? SignUp here!</button>
      </Link>
    </div>
  );
}
export default Login;
