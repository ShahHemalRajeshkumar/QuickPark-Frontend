import React from "react";
import "./AboutUs.css";

export const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <section className="intro">
        <h1>About My Parking</h1>
        <p>
          At My Parking, we simplify urban mobility by helping people find and
          reserve parking with ease. Whether you're heading to work or exploring
          a new city, we are here to make parking stress-free and efficient.
        </p>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          To revolutionize the way people park through smart technology,
          real-time tracking, and an intuitive platform that ensures no more
          wasted time or effort.
        </p>
      </section>

      <section className="values">
        <h2>What We Believe In</h2>
        <div className="value-cards">
          <div className="card">
            
            <h3>Innovation</h3>
            <p>We're always improving to stay ahead in the parking industry.</p>
          </div>
          <div className="card">
          
            <h3>Trust</h3>
            <p>We prioritize transparency, safety, and reliability for our users.</p>
          </div>
          <div className="card">
            <h3>Convenience</h3>
            <p>We are committed to making your experience smooth and efficient.</p>
          </div>
        </div>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <p>
          We're a passionate group of developers, designers, and thinkers united
          by the goal of transforming parking into a seamless experience.
        </p>
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
          alt="Team"
          className="team-img"
        />
      </section>
    </div>
  );
};
