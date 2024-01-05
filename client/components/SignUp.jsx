import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//Should import useCookies

/**
 * Signup page for creating an Account
 */
function SignUp() {
    const [ signUp, setSignUp ] = useState({
        firstName:'',
        lastName:'',
        username:'',
        password:'',
        phone: '',
        email: '',
    })
    /**Use Navigate to use react router dom to switch pages */
    const navigate = useNavigate();

    /**handleChange function to get text from every input field,
     * spreads the signUp object and adds the updated property to it using setSignUp
     */
    const handleChange = (e) => {
        e.preventDefault();
        try {
            const { name, value } = e.target;
            setSignUp({...signUp, [name]:value})
        } catch(error) {
            console.error('error occurred in extracting values from form')
        }
    }
    /** cancel button to navigate user back to homepage */
    const handleCancel = (e) => {
        navigate('/')
    }

    /** handleSubmit fetch request to back end to POST a new user to the DB*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(signUp);
            const userInfo = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUp)
            })
            navigate('/')
        } catch (error) {
            console.error('Error in signing up')
        }
    }
    return(
        <div>
            <div className='signUpPageContainer'>
                <div className='signUpCard'>
                    <h2 className='signUpTitle'>Create an Account</h2>
                    <form method='post' className='signUpForm' onSubmit={handleSubmit}>
                        <div >
                            <input className='signUpInput' type='text' name='firstName' placeholder='First Name' onChange={handleChange}></input>
                        </div>
                        <div >
                            <input className='signUpInput' type='text' name='lastName' placeholder='Last Name' onChange={handleChange}></input>
                        </div>
                        <div >
                            <input className='signUpInput' type='text' name='username' placeholder='Create Username' onChange={handleChange}></input>
                        </div>
                        <div >
                            <input className='signUpInput' type='password' name='password' placeholder='Create Password' onChange={handleChange}></input>
                        </div>
                        <div >
                            <input className='signUpInput' type='text' name='phone' placeholder='Phone Number' onChange={handleChange}></input>
                        </div>
                        <div >
                            <input className='signUpInput' type='text' name='email' placeholder='Email' onChange={handleChange}></input>
                        </div>
                        <div className='signUpButtons'>
                            <button className='signUpSubmitBtn' type='submit'>Submit</button>
                            <button className='signUpCancelBtn' type='button' onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;