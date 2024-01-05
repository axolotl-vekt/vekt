import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar';



function User() {
   /**Game navigation bar for the top of the website. */
  /**link to MemoryGame.jsx - which we see the memory game title plus brain image*/

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    email: ''
  });

  function getCookie(name) {
    /**place the data into an array */
    const cookies = document.cookie.split('; ');
    console.log('COOKIES', cookies)
    /**iterate through the cookies array */
    for (const cookie of cookies) {
      /**checks if the array contains '=' and removes it*/
      const [cookieName, cookieValue] = cookie.split('=');
      /**if cookieName matches name, then we will return the cookieValue */
      if (cookieName === name) {
        return cookieValue;
      }
    }
    /**else return null */
    return null;
  }

  const usernameCookie = getCookie('username')
  console.log(usernameCookie)
  const getUserInfo = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({ username: usernameCookie }),
      };
      console.log('getting user information for ', usernameCookie);

      const response = await fetch('http://localhost:3000/api/getUser', requestOptions);
      const data = await response.json();
      if (!response.ok) console.log('ERROR, not 200');
      console.log('async call for data', data);
      setUserInfo(data);
      console.log('user info', userInfo);
    } catch (error) {
      console.log(error, 'error accessing database');
    }
  };

  useEffect(() => {
    console.log('useEffect is working!');
    getUserInfo();
  }, []);

  /** event handler to send test message to user's phone */
  function textButtonChange(event) {

    const message = {
      to: userInfo.phone,
      body: `Hi ${userInfo.firstName}, you've opted in to Invektus daily reminders!`,
    };


    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log("SMS sent to ", usernameCookie);
        } else {
          console.log("SMS message failed")
        }
      });
  }


/**************update user******************** */

  const updateUser = async () => {
    // console.log('starting update of user ',userInfo);
    try {
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify( userInfo ),
      };

      const response = await fetch('http://localhost:3000/api/updateUser', requestOptions);
      const data = await response.json();
      if (!response.ok) console.log('ERROR, not 200');
      // console.log('async call for data', data);
      setUserInfo(data);
      // console.log('user info', userInfo);
    } catch (error) {
      console.log(error, 'error accessing database');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
    console.log('Submitted Data:', userInfo);
  }

  return (
  <center>
    <Navbar />
    <h1>
      Welcome to Invektus!
    </h1>
    <form className='userInfo' onSubmit={handleSubmit}>
        <br/><br/>
        <label>
          Username:
          <input
          // type="text"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          disabled
          />
        </label>

        <label><br/><br/>
          First Name:
          <input
          // type="text"
          name="firstName"
          value={userInfo.firstName}
          onChange={handleChange}
          />
        </label><br/><br/>

        <label>
          Last Name:
          <input
          // type="text"
          name="lastName"
          value={userInfo.lastName}
          onChange={handleChange}
          />
        </label><br/><br/>

        <label>
          Email:
          <input
          // type="text"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          />
        </label><br/><br/>

        <label>
          Phone Number:
          <input
          // type="text"
          name="phone"
          value={userInfo.phone}
          onChange={handleChange}
          />
        </label><br/><br/>


        <label className="optIn">
          <input type="checkbox" name="optIn" value={userInfo.optIn} onChange={handleChange}/>
          Opt in to daily text messages?
        </label><br/>
    <button className="userSaveBtn" onClick={textButtonChange}>Send Test Text</button><br></br><br></br>

    <button className="userSaveBtn" type="submit">Save</button>
    </form>
  </center>
  )
}

export default User;
