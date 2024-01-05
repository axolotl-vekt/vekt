import React from 'react';
import Navbar from './Navbar'

function About() {
    return(
        <div>
            <Navbar />
            <div id="AboutMeHeader">
                <h1> Invektus: Unconquerable Health, Unyielding Strength </h1>
            </div>
            <div id="AboutBody" className="aboutbody"><br />
                We are Invektus, an application designed to monitor vitals and blood sugar for diabetic patients 
                in hopes to encourage constant regulation of our users' health. By keeping track of the sugar levels, 
                individuals can make informed decisions regarding their lifestyle, dietary choices, and medication 
                management. This approach can help individuals to maintain stable blood sugar levels, reduce the risk of 
                complications associated with diabetes. Our application servers as a fundamental tool for patients in 
                effectively managing the challenges posed by this chronic condition.
            </div>
            <div>
            <img className='loginImg' src="https://media2.giphy.com/media/zMQve1zBszJ3Uqsbi2/giphy.gif?cid=ecf05e47z2ymgogd8ro4cjao5bzj21s2s5h6dvmns8iujjqw&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="" />
            </div>
        </div>
        
    )
};

export default About;