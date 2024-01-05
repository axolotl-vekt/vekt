import React, { useState, useEffect, Component } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import FoodLog from './FoodLog';
import SugarGraph from './SugarGraph';
import BloodPressureGraph from './BloodPressureGraph'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal'
import Quotes from './Quotes'
import { DatasetController } from 'chart.js';


function Homepage() {
  
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
  /**assign usernameCookie to username - login name */
  const usernameCookie = getCookie('username')
  console.log(usernameCookie)
  const cards = [];
  // for (let i = 0; i < 3; i++) {
  //   cards.push(<InfoCard key={crypto.randomUUID()}/>);
  // }
  /**set buttonPopup to false */
  const [buttonPopup, setButtonPopup] = useState(false);
  /**set data to empty array */
  const [ data, setData ] = useState([]);
  const [ count, setCount] = useState(1);


  useEffect(() => {
    /**fetching the data from router/homepage - which grabs all of the data from mongodb */
    fetch('http://localhost:3000/api/homepage/bloodsugar')
    /**parses the data */
    .then(response => response.json())
    .then(data => {
      const array = []
      /**iterate through the data */
      data.forEach(el => { 
      /**check if the username makes the usernameCookie */
        if(el.username === usernameCookie){
          const dateObject = new Date(el.date);
          const options = { weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute:'numeric' };
          const formattedDate = dateObject.toLocaleString('en-US', options);
          el.date = formattedDate
          array.push(el)
          // const formattedData = data.map(item => {
            // const dateObject = new Date(item.date);
            // const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
            // const formattedDate = dateObject.toLocaleString('en-US', options);
            // return {...item, date: formattedDate}
          // })
          
        }
      
      })
      console.log(array)
      setData(array)
    })
    .catch(error => console.log('Error displaying entries on homepage'))
    /**removed data from [data] - so browser does constantly render */
  },[count])
  
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/foodlog');
  // };

  function getCookie(cookieName) {
    /**stores data into array */
    const cookies = document.cookie.split('; ');
    /**iterates through the array and removes the '=' */
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      /**returns the value if name equals to cookieName */
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
  
    return null;
  }

  /**deletes the account */
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(console.log('successfully deleted'))
    .then(setCount(count + 1))
    .catch(err => console.log(err))

  }

  //update pop up modal:
  const [ open, setOpen ] = useState(false);
  const [ itemId, setItemId ] = useState(null)
  const [ formData, setFormData ] = useState({
    bloodSugar:'',
    sysPressure:'',
    diaPressure:'',
  })

  const handleOpen = (theId) => {
    setOpen(true);
    setItemId(theId)
  };

  const handleClose = () => {
    setCount(count + 1)
    console.log("COUNT", count)
    setOpen(false)
    setItemId(null)
    setFormData({
      bloodSugar:'',
      sysPressure:'',
      diaPressure:''
    })
  }

  /**saves the blood/press entries */
  const handleSubmit = () => {
    if (itemId) {
      const selectedItem = data.find(item => item._id === itemId)
      if (selectedItem) {
        fetch('http://localhost:3000/api/update/', {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            id: itemId,
            bloodSugar: formData.bloodSugar,
            sysPressure: formData.sysPressure,
            diaPressure: formData.diaPressure,
          })
        })
      }
    }
    setCount(count + 1)
    console.log("COUNT", count)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]:value})
  }

  return (
    <div>
      <h1>Invektus</h1>
      {/* <h3><Quotes /></h3> */}
      <div>
        <Navbar />
      </div>
      <div className='graphs'>
        <SugarGraph username={usernameCookie} count={count}/>
        <BloodPressureGraph username={usernameCookie} count={count}/>
      </div>
      <div className='newEntryBtnContainer'>
        <button id='newEntry-btn' onClick={() => setButtonPopup(true)}>New Entry</button>
      </div>
      {/* <div className='card-container'>{cards}</div> */}
      <FoodLog trigger={buttonPopup} setTrigger={setButtonPopup} getCookie={getCookie} setCount={setCount} count={count}></FoodLog>
      <div className='entriesContainer'>
        {data.map(item => (
          <div key={item._id} className='entriesHomepage'>
            <div>
              <div>{item.date}</div>
              <div>Blood Sugar: {item.bloodSugar} mg/dL</div>
              <div>Blood Pressure: {item.sysPressure} / {item.diaPressure} mmHg</div>
            </div>
            <div className='entryBtn'>
              <button className='updateBtn'><FontAwesomeIcon icon={faPen}  type='button' onClick={() => handleOpen(item._id)}/></button>
              <button className='deleteBtn'><FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item._id)}/></button>
            </div>
          </div>
        ))}
              <Modal isOpen={open} onClose={handleClose} onSubmit={handleSubmit}>
                  <div>
                    <form>
                      <div>
                        <label>Blood Sugar</label>
                        <input type='text' onChange={handleChange} name='bloodSugar' className='inputHealth'/> mg/dL
                      </div>
                      <div>
                        <label>Blood Pressure</label>
                        <input type='text' onChange={handleChange} name='sysPressure' className='inputHealth'/> / <input type='text' onChange={handleChange} name='diaPressure' className='inputHealth'/> mmHg
                      </div>
                    </form>
                </div>
              </Modal>
      </div>
    </div>
  );
}

// function Homepage() {
//   return(
//   <div>
//     <h1 className="hp-header">Homepage</h1>
//     <div className="entries-container">Entries
//       <div className="entries">
//         <p>Date:</p>
//         <p>Blood sugar:</p>
//         <p>Blood Pressure:</p>
//         <p>Time:</p>
//         <p>Before or After meal?</p>
//       </div>
//     </div>
//   </div>
//   )
// }

export default Homepage;
