import React from 'react';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

function LineGraph({username}) {

  const sugarLevel= [];
  const sugarDate = [];

  const [ userData, setUserData ] = useState({
    labels: '',
    datasets: [],
  }) 

  
  useEffect(() => {
    fetch('http://localhost:3000/api/homepage/bloodsugar', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
      .then(response => console.log("response data here", response.json()))
      .then(data => {
        if (!data[0]) {
          for (let i = 0; i < data.length; i++) {
            if (Object.hasOwnProperty(data[i], 'bloodSugar') && data[i].username === username) {
              sugarLevel.push(data[i].bloodSugar);
              const dateObject = new Date(data[i].date);
              const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
              const formattedDate = dateObject.toLocaleString('en-US', options);
              sugarDate.push(formattedDate);
            }
          }
          const chartData = {
            labels: sugarDate,
            datasets: [
              {
                label: 'Blood Sugar Level Today',
                data: sugarLevel,
              },
            ],
          };
          setUserData(chartData);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [username]);
  

  return (
    <div style={{ width: 700 }}>
      <Line data={userData} />
    </div>
  );
}

export default LineGraph;
