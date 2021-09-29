import React, { useEffect, useState } from 'react';
import './SentimentPieChart.css';
import Chart from 'react-apexcharts';

function SentimentPieChart(props) {
  const options = {
    chart: {
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: '10px',
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },

    labels: ['Positve', 'Negative', 'Neutral'],
    legend: {
      position: 'top',
      fontSize: '10px',
      markers: {
        width: 12,
        height: 12,
        fillColors: ['#54E346', '#FF4848', '#C1CFC0'],
      },
    },
    fill: {
      opacity: 1,
      colors: ['#54E346', '#FF4848', '#C1CFC0'],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const [chartdata, setchartdata] = useState([1, 1, 1]);

  useEffect(() => {
    setchartdata((p) => (p = props.data));
  }, [props.data]);

  return (
    <div className="sentiment-pie-chart-div">
      <Chart options={options} series={chartdata} type="donut" />
    </div>
  );
}

export default SentimentPieChart;
