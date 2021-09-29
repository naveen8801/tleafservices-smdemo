import React from 'react';
import { Container, Card } from 'react-bootstrap';
import './Bootstrapcard.css';

function BootStrapCard({ title, value }) {
  return (
    <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
      <Card style={{ width: '8rem' , height : "100px" , display : "flex" , justifyContent : "center" , alignItems : "center" }}>
        <h5 className="counter-title">{title}</h5>
        <h2 className="counter-value">{value}</h2>
      </Card>
    </div>
  );
}

export default BootStrapCard;
