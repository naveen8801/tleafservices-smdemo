import React from 'react';
import './CategoryCounter.css';

function CategoryCounter({ title, value }) {
  return (
    <div className="category-counter-div">
      <h5 className="counter-title">{title}</h5>
      <h2 className="counter-value">{value}</h2>
    </div>
  );
}

export default CategoryCounter;
