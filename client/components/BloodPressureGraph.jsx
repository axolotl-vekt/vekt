import React from 'react';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function BloodPressureGraph({ username }) {
  const [userData, setData] = useState({
    labels: '',
    datasets: [],
  });

  const systolicPressures = [];
  const diabolicPressures = [];
  const bpDates = [];
  useEffect(() => {
    fetch('http://localhost:3000/api/homepage/bloodsugar')
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (
            Object.hasOwn(data[i], 'sysPressure') &&
            data[i].username === username
          ) {
            systolicPressures.push(data[i].sysPressure);
            diabolicPressures.push(data[i].diaPressure);
            const dateObject = new Date(data[i].date);
            const options = {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            };
            const formattedDate = dateObject.toLocaleString('en-Us', options);
            bpDates.push(formattedDate);
          }
        }
        const chartData = {
          labels: bpDates,
          datasets: [
            { label: 'Systolic Blood Pressure', data: systolicPressures },
            {
              label: 'Diabolic Blood Pressure',
              data: diabolicPressures,
            },
          ],
        };
        setData(chartData);
      });
  });

  return (
    <div style={{ width: 700 }}>
      <Line data={userData} />
    </div>
  );
}

export default BloodPressureGraph;
