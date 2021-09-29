import React from 'react';
import './GaugeChart.css';
import GaugeChart from 'react-gauge-chart';

function GaugeChart() {
  return (
    <div className="gauge-chart-div">
      <GaugeChart
        animate={false}
        nrOfLevels={15}
        percent={0.56}
        needleColor="#345243"
      />
    </div>
  );
}

export default GaugeChart;
