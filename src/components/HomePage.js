import React from 'react';
import '../css/HomePage.css';
import { FaCheckCircle, FaPauseCircle, FaTimesCircle } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">DTH Subscription Dashboard</h1>
      <div className="cards-container">
        <div className="card active">
          <FaCheckCircle className="card-icon" />
          console.log(window)
          <h3>Active Plans</h3>
          <div className="count">128</div>
        </div>
        <div className="card inactive">
          <FaPauseCircle className="card-icon" />
          <h3>Inactive Plans</h3>
          <div className="count">42</div>
        </div>
        <div className="card closed">
          <FaTimesCircle className="card-icon" />
          <h3>Closed Plans</h3>
          <div className="count">16</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
