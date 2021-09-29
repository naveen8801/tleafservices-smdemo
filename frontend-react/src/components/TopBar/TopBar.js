import React from 'react';
import './TopBar.css';

function TopBar(props) {
  return (
    <div className="topbar">
      <div
        className={`topbar-item ${props.active === 0 ? 'active-period' : ''}`}
      >
        <h5 className="heading-topbar" onClick={() => props.activeCheck(0)}>
          Live
        </h5>
      </div>
      <div
        // onClick={props.HistoricDataFetch()}
        className={`topbar-item ${props.active === 1 ? 'active-period' : ''}`}
      >
        <h5 className="heading-topbar" onClick={() => props.activeCheck(1)}>
          Historic Data
        </h5>
      </div>
    </div>
  );
}

export default TopBar;
