import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';

async function FoodLog(props) {
  // const username = props.getCookie(username); //not sure what this is -sean 20240103
  const username = "sean"
  // console.log("username:", username)

  console.log("cookies username test: ", username)
  const [data, setData] = useState({})

  const [entryData, setEntryData] = useState({
    username: "",
    date: "",
    time: "",
    bloodSugar: "",
    sysPressure: "",
    diaPressure: "",
  })

  try {
    // const loginInfo = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({username}),
    // };

    // console.log("=> handleChange at FoodLog")
    // const reponse = await fetch('/api/signin', loginInfo);
    // const data = await reponse.json();

      

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch("/signin");
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }, []);

    console.log('foodLog loginInfo data:', data);
    console.log('foodLog username data:', data.currentUser);
 
      

  } catch (error) {
    console.log('err getting username', error);
  }

  const navigate = useNavigate();
  const handleChange = async (e) => {
    console.log("EntryData found at handleChange:", entryData)
    const { name, value } = e.target;
    setEntryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(entryData),
      };

      const response = await fetch('http://localhost:3000/api/entry', options)
      console.log('Entry Posted successfully ', response);
      navigate('/homepage');
    } catch (error) {
      console.error('Error in front-end:', error.message);
    }
  };

  const today = new Date();

  return (props.trigger) ? (
    <Draggable>
      <div className="entries-form-container" component="form">
        <form className='entries-form' onSubmit={handleSubmit}>
          <div className='entries'>
            <label className="dateLabel"> Date & Time: {/*today.toLocaleDateString()*/}
              <input className="inputBar" 
                    type="date"
                    name="date"
                    value={entryData.date} 
                    onChange={handleChange}/>
              <input className="inputBar" 
                  type="time"
                  name="time"
                  value={entryData.date} 
                  onChange={handleChange}/>
            </label>
            <label className='bloodSugarInput'> Blood Sugar:
              <input className="inputBar"
                  name='bloodSugar'
                  value={entryData.bloodSugar} 
                  onChange={handleChange}>
              </input> 
              <p className='paragraphBP'>mg/dL</p>
            </label>
            <label className='bloodPressure'>
              Blood Pressure:
              <input className='inputBar'
                  name='sysPressure'
                  value={entryData.sysPressure}
                  onChange={handleChange}>
              </input> 
              <p className='paragraphBP'>/</p>
              <input className='inputBar'
                  name='diaPressure'
                  value={entryData.diaPressure}
                  onChange={handleChange}>
              </input> 
              <p className='paragraphBP'>mmHg</p>
            </label>
          {/* <label>
            Time: <input value={time || ''} onChange={setTime}></input>
          </label> */}
          {/* <p>Before or After meal?</p> */}
          {/* link to where you can see the images */}
          <Link to='/foodlog'>Meal Log</Link>
          <button className='save-entry-btn' onChange={handleChange}>
            Save Entry
          </button>
          <button className='popup-close-btn' onClick={() => props.setTrigger(false)}>Close</button>
          { props.children }
        </div>
      </form>

      </div>
    </Draggable>

  ) : '';
}

export default FoodLog;
