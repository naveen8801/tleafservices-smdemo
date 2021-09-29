import React, { useState } from 'react';
import './SearchKeyword.css';

function SearchKeyword() {
  const [curentKeyword, setcurrent] = useState('');
  const [keywordslist, setkeywordslist] = useState([]);
  const AddKeywordHandler = () => {
    if (curentKeyword.trim() == '') {
      return;
    }
    setkeywordslist([...keywordslist, curentKeyword]);
  };

  const RemoveHandler = (index) => {
    const newlist = [];
    for (let i = 0; i < keywordslist.length; i++) {
      if (keywordslist[i] !== keywordslist[index]) {
        newlist.push(keywordslist[i]);
      }
    }
    setkeywordslist(newlist);
  };

  return (
    <div className="search-keyword-div">
      <div className="input-field-div">
        <input
          value={curentKeyword}
          className="inp"
          type="text"
          value={curentKeyword}
          placeholder="keyword"
          onChange={(e) => setcurrent(e.target.value)}
        />
        <button onClick={AddKeywordHandler} className="btn-">
          Go
        </button>
      </div>
      <div className="show-list">
        {keywordslist.map((i, index) => (
          <div
            onClick={() => RemoveHandler(index)}
            className="item-keyword"
            key={index}
          >
            {i}
          </div>
        ))}
      </div>
      <button className="apply-btn">Apply</button>
    </div>
  );
}

export default SearchKeyword;
