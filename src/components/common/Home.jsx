import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

export const Home = () => {
    return (
        <div className="home-container">
            {/* Dark overlay for better visibility */}
            <div className="overlay"></div>

            <div className="hero">
                <div className="center-heading">
                    <h1 className="heading-box">🚗 My Parking</h1>
                </div>
                <p>Find & Reserve Your Perfect Parking Spot Hassle-Free.</p>
            </div>

            {/* About My Parking Section */}
            <div className="center-heading">
                <h2 className="heading-box">✨ Why Choose My Parking?</h2>
            </div>
            <div className="features">
                <div className="card">
                    <h3>Easy Booking</h3>
                    <p>Reserve parking spots in advance with a few clicks.</p>
                </div>
                <div className="card">
                    <h3>Real-Time Availability</h3>
                    <p>See real-time updates on available parking spaces.</p>
                </div>
                <div className="card">
                    <h3>Secure & Safe</h3>
                    <p>Well-monitored parking areas for maximum security.</p>
                </div>
            </div>

            {/* Facilities Section */}
            <div className="center-heading">
                <h2 className="heading-box">🚙 Facilities We Offer</h2>
            </div>
            <div className="facilities">
                <div className="card">📍 Location-Based Search</div>
                <div className="card">🕒 24/7 Parking Access</div>
                <div className="card">📱 Mobile Booking</div>
                <div className="card">🛠 Vehicle Assistance</div>
                <div className="card">🅿️ Reserved Parking</div>
                <div className="card">🔒 Secure Payment Options</div>
                <div className="card">🚧 CCTV Surveillance</div>
                <div className="card">🚀 Quick Check-In & Check-Out</div>
            </div>

            {/* CTA Section */}
            <div className="cta">
                <h2 className="heading-box">Book Your Parking Spot Now!</h2>
                <p>Save time and avoid last-minute parking hassles.</p>
                <Link to="/signup" className="cta-button">Get Started</Link>
            </div>
        </div>
    );
};
