import React from 'react'
import { Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react';
import { Chart as ChartJS} from 'chart.js/auto'

/** Line graph function that takes in username and
 * renders a line graph of blood sugar levels with chargJS
 * */
function LineGraph({username, count}) {

  const sugarLevel =[];
  const sugarDate = [];


  const [ userData, setData ] = useState({
    labels: '',
    datasets: [],
  })


/** 
 * fetches all data from database and returns it.
 * Then iterates through the data and pushes it to sugarLevel array and sugarDate array
 * then sets the userData state
 * */
  useEffect(() => {
    fetch('http://localhost:3000/api/homepage/bloodsugar')
      .then(response => response.json())
      .then(data => {
        console.log("DATA", data)
        for (let i = 0; i < data.length; i++) {
          if (Object.hasOwn(data[i],'bloodSugar') && data[i].username===username) {
            sugarLevel.push(data[i].bloodSugar)
            const dateObject = new Date(data[i].date);
            const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
            const formattedDate = dateObject.toLocaleString('en-US', options)
            sugarDate.push(formattedDate)
          }
        }
        const chartData = {
          labels: sugarDate,
          datasets: [
            {
              label: 'Blood Sugar Level Today',
              data: sugarLevel,
            }
          ]
        }
        setData(chartData)
      })
    }, [count])

/** Renders a line graph by passing in userData into a Line component from react chart js
 * */
  return (
    <div style={{ width: 700 }}>
      <Line data={userData} />
    </div>
  )
}

export default LineGraph
