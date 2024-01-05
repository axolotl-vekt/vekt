import React from 'react'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

function BloodPressureGraph({username, count}) {

	/**
	 * initialize userData to store labels and datasets
	 */
	const [ userData, setData ] = useState({
		labels: '',
		datasets: [],
	})
	/**
	 * initialize arrays to store individual data
	 */
	const systolicPressures = [];
	const diabolicPressures = [];
	const bpDates = [];

	/**
	 * fetches blood pressure data from the api
	 */
	useEffect(() => {
		/**
		 * upon successful request, loops through fetched data and checks if the data already has a sysPressure
		 * property, and if the username matches. if it does it extracts that data and stores it in the arrays.
		 */
		fetch('http://localhost:3000/api/homepage/bloodsugar')
			.then(response => response.json())
			.then(data => {
				for (let i = 0; i < data.length; i++) {
					if (Object.hasOwn(data[i],'sysPressure') && data[i].username === username) {
						systolicPressures.push(data[i].sysPressure)
						diabolicPressures.push(data[i].diaPressure)
						const dateObject = new Date(data[i].date)
						const options = {  month: 'short', day: 'numeric', hour: 'numeric', minute:'numeric'};
						const formattedDate = dateObject.toLocaleString('en-Us', options);
						bpDates.push(formattedDate)
					}
				}
				/**
				 * creates a chartData object with labels and datasets properties, which will be used to update the 
				 * state variable.
				 */
				const chartData = {
					labels: bpDates,
					datasets: [
						{label: 'Systolic Blood Pressure',
						data: systolicPressures,},
						{
							label: 'Diastolic Blood Pressure',
							data: diabolicPressures,
						}
					]
				}
			setData(chartData);
			})
	}, [count])
/** 
 * component returns a div containing a Line chart from react-chartjs-2, and it passes the 
 * userData as the data prop for the chart. 
 * */
  return (
    <div style={{ width: 700 }}>
      <Line data={userData}/>
    </div>
  )
}

export default BloodPressureGraph
