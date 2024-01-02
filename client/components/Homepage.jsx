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


function Homepage() {
  
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }
  const usernameCookie = getCookie('username')
  console.log(usernameCookie)
  const cards = [];
  // for (let i = 0; i < 3; i++) {
  //   cards.push(<InfoCard key={crypto.randomUUID()}/>);
  // }
  const [buttonPopup, setButtonPopup] = useState(false);
  const [ data, setData ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/homepage/bloodsugar')
    .then(response => response.json())
    .then(data => {
      const array = []
      data.forEach(el => { 
      
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
  },[data])
  
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/foodlog');
  // };

  function getCookie(cookieName) {
    const cookies = document.cookie.split('; ');
  
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
  
    return null;
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(console.log('successfully deleted'))
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
    setOpen(false)
    setItemId(null)
    setFormData({
      bloodSugar:'',
      sysPressure:'',
      diaPressure:''
    })
  }

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
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]:value})
  }

  return (
    <div>
      <h1>VEKTOR</h1>
      <h3><Quotes /></h3>
      <div>
        <Navbar />
      </div>
      <div className='graphs'>
        <SugarGraph username={usernameCookie}/>
        <BloodPressureGraph username={usernameCookie}/>
      </div>
      <div className='newEntryBtnContainer'>
        <button id='newEntry-btn' onClick={() => setButtonPopup(true)}>New Entry</button>
      </div>
      {/* <div className='card-container'>{cards}</div> */}
      <FoodLog trigger={buttonPopup} setTrigger={setButtonPopup} getCookie={getCookie}></FoodLog>
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
