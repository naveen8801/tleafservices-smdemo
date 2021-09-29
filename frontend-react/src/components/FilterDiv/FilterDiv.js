import React, { useEffect, useState } from 'react';
import SearchKeyword from '../SearchKeyword/SearchKeyword';
import './FilterDiv.css';

function FilterDiv(props) {
  const [incident, setincident] = useState(true);
  const [info, setinfo] = useState(true);
  const [other, setother] = useState(true);
  const [currentSelected, setcurrentSelected] = useState(0);

  useEffect(() => {

    const list = [];
    
    if (incident) {
      list.push('Incident');
    }
    if (info) {
      list.push('Info');
    }
    if (other) {
      list.push('Other');
    }
    props.filters(list);
  }, [incident, info, other]);

  return (
    <div className="filter-div">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3
          onClick={() => setcurrentSelected(0)}
          className={`filter-heading ${
            currentSelected === 0 ? 'active-heading' : ''
          }`}
        >
          Filter
        </h3>
        <h3
          onClick={() => setcurrentSelected(1)}
          className={`filter-heading ${
            currentSelected === 1 ? 'active-heading' : ''
          }`}
        >
          Sources
        </h3>
      </div>
      <div className="filter-div-content">
        {currentSelected === 0 ? (
          <>
            <div className="filterdiv-item-set">
              <input
                value={incident}
                type="checkbox"
                onChange={() => setincident(!incident)}
                defaultChecked={true}
              />
              <label>Incident</label>
            </div>
            <div className="filterdiv-item-set">
              <input
                value={info}
                type="checkbox"
                onChange={() => setinfo(!info)}
                defaultChecked={true}
              />
              <label>Info</label>
            </div>
            <div className="filterdiv-item-set">
              <input
                value={other}
                type="checkbox"
                onChange={() => setother(!other)}
                defaultChecked={true}
              />
              <label>Other</label>
            </div>
          </>
        ) : (
          <SearchKeyword />
        )}
      </div>
    </div>
  );
}

export default FilterDiv;
