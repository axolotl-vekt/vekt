import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

/**user daily entry for blood sugar and blood pressure*/

const useInput = ({start}) => {
    const [value, setValue] = useState(start);
    const onChange = (e) => {
      setValue(e.target.value);
    };
    return [value, onChange];
  };

function InfoCard() {
  return (
    <div className='entries-container'>
      Entries
      <div className='entries'>
        <p>Date:</p>
        <p>Blood sugar:</p>
        <p>Blood Pressure:</p>
        <p>Time:</p>
        <p>Before or After meal?</p>
        <Link to="/foodlog">Log Meal</Link>
      </div>
    </div>
  );
}

export default InfoCard;
