import React, { useState, useEffect } from 'react';
import CategoryCounter from '../CategoryCounter/CategoryCounter';
import './HistoricDataCard.css';

function HistoricDataCard() {
  const [currentSelected, setcurrentSelected] = useState(0);
  return (
    <div className="historic-data-card-div">
      <div className="tab-selection-bar">
        <h3
          onClick={() => setcurrentSelected(0)}
          className={`tab-heading ${
            currentSelected === 0 ? 'tab-active-heading' : ''
          }`}
        >
          Last Week
        </h3>
        <h3
          onClick={() => setcurrentSelected(1)}
          className={`tab-heading ${
            currentSelected === 1 ? 'tab-active-heading' : ''
          }`}
        >
          Last Month
        </h3>
      </div>
      <div className="historic-data-content">
        <CategoryCounter title="Positive" value={23} />
        <CategoryCounter title="Negative" value={13} />
        <CategoryCounter title="Neutral" value={33} />
      </div>
    </div>
  );
}

export default HistoricDataCard;
