import React, { useState, useEffect } from 'react';
import './MultiBarCharts.css';
import Chart from 'react-apexcharts';

function MultiBarCharts(props) {
  const [options, setoptions] = useState({
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width : 2
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left',
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
  });


  const [chartdata, setdata] = useState([
    {
      name: 'Positive',
      data: [44, 55, 57, 56, 61, 58, 63],
    },
    {
      name: 'Negative',
      data: [76, 85, 101, 98, 87, 105, 94],
    },
    {
      name: 'Neutral',
      data: [35, 41, 36, 26, 45, 48, 52],
    },
  ]);

  useEffect(() => {
    const options_ = {
      chart: {
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      colors: ['#54E346', '#FF4848', '#C1CFC0'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        width: 2,
      },
      title: {
        text: 'Tweet Count Last Seven Days ',
        align: 'left',
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: props.data[0].reverse(),
      },
    };

    const newdata = [
      {
        name: 'Positive',
        data: props.data[1].reverse(),
      },
      {
        name: 'Negative',
        data: props.data[2].reverse(),
      },
      {
        name: 'Neutral',
        data: props.data[3].reverse(),
      },
    ];

    setoptions(options_);
    setdata(newdata);
  }, [props.data]);

  console.log(chartdata);

  return (
    <div className=" bg-light multi-bar-chart-div">
      <Chart options={options} series={chartdata} type="line" />
    </div>
  );
}

export default MultiBarCharts;
