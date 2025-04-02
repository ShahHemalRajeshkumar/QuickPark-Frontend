import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; 
import hamburgermenu from "../../assets/images/hamburgermenu.png";

export const ProviderNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate(); 


  const handleLogout = () => {
    localStorage.removeItem("id"); 
    sessionStorage.removeItem("role"); 
    navigate("/login"); 
  };

  return (
    <nav
      className="app-header navbar navbar-expand bg-body"
      style={{
        background: "white",
        color: "black",
        zIndex: 1050,
        position: "fixed",
        width: "100%",
        top: 0,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container-fluid">
        <ul className="navbar-nav">
        
          <li className="nav-item">
            <button
              className="nav-link btn btn-light"
              style={{
                color: "black",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background: "white",
                zIndex: 1100,
                position: "relative",
              }}
              onClick={toggleSidebar}
            >
              <img src={hamburgermenu} style={{ height: "25px", width: "25px" }} alt="Menu" />
            </button>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link to="/home" className="nav-link" style={{ color: "black" }}>
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link to="/contact" className="nav-link" style={{ color: "black" }}>
              Contact Us
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
              <FiLogOut size={20} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
