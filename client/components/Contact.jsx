import React from 'react';
import Navbar from './Navbar'

function Contact() {
    return(
        <div>
            <Navbar />
            <div id="AboutMeHeader">
                <h1> Connecting Lives, One Contact at a Time: Invektus, Your Bridge to Health and Wellness </h1>
            </div>
            <div id="AboutBody" className="aboutbody"><br />
            At Invektus, we value open communication and are here to address any inquires or concerns you may have. Our 
            dedicated team is committed to providing you with exceptional support and guidance. Whether you are a 
            user seeking assistance with our health monitoring solutions or a potential partner interested in joining forces,
            feel free to each out to us. Your feedback is invaluable and we look forward to hear from you. For any emergencies, 
            please contact your healthcare provider or visit the nearest hospital. Your well-being is our top priority! 
            </div><br />

            <div className="aboutbody">
            <h2>Email: Invektus@gmail.com</h2>
            </div>
            <div>
            <img className='loginImg2' src="https://media4.giphy.com/media/cAhYSQkgSq8KLlciwF/giphy.gif?cid=ecf05e47v6uc5pq8fhmee1svkbzqtourxwx2i7ib2meya4mo&ep=v1_gifs_related&rid=giphy.gif&ct=g" alt="" />
            </div>
        </div>
        
    )
};

export default Contact;