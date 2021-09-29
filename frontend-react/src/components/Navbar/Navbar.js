import React from 'react';
import './Navbar.css';
import { useHistory } from 'react-router-dom';

function Navbar() {
  let history = useHistory();
  const logoutHandler = () => {
    history.push('/');
  };
  return (
    <div className="navbar">
      <h2 className="navabar-heading">Welcome User !</h2>
      <div className="navabar-content">
        <ul className="navabar-list">
          <li className="navabar-list-items active-item">Social Feed</li>
          <li className="navabar-list-items" onClick={logoutHandler}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
