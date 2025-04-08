import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import ParkingBackground from "../../assets/images/ParkingBackground.jpg";

export const Home = () => {
  return (
    <div className="home">
      <header
        className="hero"
        style={{ backgroundImage: `url(${ParkingBackground})` }}
      >
        <div className="hero-overlay">
          <h1 className="fade-in">Welcome to My Parking 🚗</h1>
          <p className="fade-in delay">Find and book parking in seconds!</p>
          <div className="hero-buttons fade-in delay-more">
            <Link to="/contact" className="btn">
              Contact Us
            </Link>
            <Link to="/user/searchparking" className="btn-outline">
              Book Your Slot
            </Link>
          </div>
        </div>
      </header>

      <section className="features">
        <h2 className="fade-in">Why Choose Us?</h2>
        <div className="cards fade-in delay">
          <div className="card slide-up">
            <h3>🧭 Easy Navigation</h3>
            <p>Find nearby parking spots with real-time data.</p>
          </div>
          <div className="card slide-up delay">
            <h3>📆 Advance Booking</h3>
            <p>Reserve your spot in advance and skip the wait.</p>
          </div>
          <div className="card slide-up delay-more">
            <h3>🔐 Secure Parking</h3>
            <p>Our verified partners provide 24/7 secure parking zones.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 My Parking. All rights reserved.</p>
      </footer>
    </div>
  );
};
