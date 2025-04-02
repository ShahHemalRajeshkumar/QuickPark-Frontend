import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaEnvelope } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"; 
import hamburgermenu from "../../assets/images/hamburgermenu.png";

export const UserNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("id"); 
    localStorage.removeItem("role"); 
    navigate("/login"); 
  };

  return (
    <nav 
      className="app-header navbar navbar-expand"
      style={{
        background: "#343a40", 
        color: "#007bff",
        zIndex: 1050,
        position: "fixed",
        width: "100%",
        top: 0,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="nav-link btn"
              style={{
                color: "#007bff",
                padding: "5px 10px",
                border: "1px solid #444",
                borderRadius: "5px",
                background: "#343a40",
              }}
              onClick={toggleSidebar}
            >
              <img src={hamburgermenu} style={{ height: "25px", width: "25px" }} alt="Menu" />
            </button>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link to="/home" className="nav-link" style={{ color: "#007bff" }}>
            <FaHome size={17} /> Home
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link to="/contact" className="nav-link" style={{ color: "#007bff" }}>
            <FaEnvelope size={17} /> Contact Us
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button
              className="btn btn-danger logout-btn"
              style={{
                color: "white",
                position: "fixed",
                top: "10px",
                right: "20px",
                zIndex: 1100,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 15px",
                fontSize: "16px",
                borderRadius: "5px",
              }}
              onClick={handleLogout} 
            >
              <FiLogOut size={20} /> LogOut
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
