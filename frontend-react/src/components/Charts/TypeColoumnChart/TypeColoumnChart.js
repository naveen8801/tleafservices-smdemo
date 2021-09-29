import React, { useEffect, useState } from 'react';
import './TypeColoumnChart.css';
import Chart from 'react-apexcharts';

function TypeColoumnChart() {
  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    grid: {
      show: false,
    },

    xaxis: {
      categories: ['Incident', 'Info', 'Others'],
    },
    fill: {
      opacity: 1,
    },
    colors: ['#39A2DB'],
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const [chartdata, setchartdata] = useState([
    {
      name: 'count',
      data: [44, 55, 26],
    },
  ]);

  return (
    <div className="type-bar-chart-div">
      <Chart options={options} series={chartdata} type="bar" />
    </div>
  );
}

export default TypeColoumnChart;
