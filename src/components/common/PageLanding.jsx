import React from 'react';
import { Link } from 'react-router-dom';
import "./PageLanding.css";
import landingBg from '../../assets/images/landingBg1.jpg'; 

const PageLanding = () => {
  return (
    <div className="myparking-landing" style={{ backgroundImage: `url(${landingBg})` }}>
      <div className="overlay">
        <nav className="navbar">
          <div className="logo"> My Parking</div>
          <div className="nav-buttons">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn btn-outline">Signup</Link>
          </div>
        </nav>

        <div className="hero-content">
          <h1>Smart Parking Made Simple</h1>
          <p>Find, Book & Park — hassle-free parking at your fingertips.</p>
          <div className="hero-buttons">
            <Link to="/user" className="btn">Get Started</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLanding;
