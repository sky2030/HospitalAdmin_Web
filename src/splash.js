import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import SmhsLogo from '../src/Smhs_Logo.png';
import './dashboard/dashboard.css';


function Hospital() {

  useEffect(() => {
    localStorage.removeItem('token')

  }, [])


  return (
    <div className="App">
      <Link to="/login">
        <div className="splash_bg">
          <img src={SmhsLogo} alt="Motherson Group" className="splash-logo" />
        </div>
      </Link>

    </div>
  );
}

export default Hospital;
