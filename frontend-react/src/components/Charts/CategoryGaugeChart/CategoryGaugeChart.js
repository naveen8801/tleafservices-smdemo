import React, { useEffect, useState } from 'react';
import './CategoryGaugeChart.css';
// import Chart from 'react-apexcharts';
import Chart from 'chartjs-gauge';

function CategoryGaugeChart() {
  const [options, setoptions] = useState({
    needle: {
      radiusPercentage: 2,
      widthPercentage: 3.2,
      lengthPercentage: 80,
      color: 'rgba(0, 0, 0, 1)',
    },
    valueLabel: {
      display: true,
      formatter: (value) => {
        return '$' + Math.round(value);
      },
      color: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      borderRadius: 5,
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  });
  const [chartdata, setchartdata] = useState([
    {
      value: 0.5,
      minValue: 0,
      data: [1, 2, 3, 4],
      backgroundColor: ['green', 'yellow', 'orange', 'red'],
    },
  ]);
  return (
    <div className="incident-bar-chart">
      <Chart
        options={options}
        series={chartdata}
        type="gauge"
        height="100%"
      />
    </div>
  );
}

export default CategoryGaugeChart;
