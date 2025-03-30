import React from "react";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import { Link } from "react-router-dom";

export const UserNavbar = ({ toggleSidebar }) => {
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
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link btn btn-light"
              href="#"
              role="button"
              style={{
                color: "black",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={toggleSidebar}
            >
              <img src={hamburgermenu} style={{ height: "25px", width: "25px" }} alt="Menu" />
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link" style={{ color: "black" }}>
              Home
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
        <Link to="/contact" className="nav-link" style={{ color: "black" }}>
         Contact Us
         </Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              <i className="bi bi-search" style={{ color: "black" }} />
            </a>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
              <i className="bi bi-chat-text" style={{ color: "black" }} />
              <span className="navbar-badge badge text-bg-danger">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <a href="#" className="dropdown-item">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img
                      src="../../dist/assets/img/user1-128x128.jpg"
                      alt="User Avatar"
                      className="img-size-50 rounded-circle me-3"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-end fs-7 text-danger">
                        <i className="bi bi-star-fill" />
                      </span>
                    </h3>
                    <p className="fs-7">Call me whenever you can...</p>
                    <p className="fs-7 text-secondary">
                      <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
              <i className="bi bi-bell-fill" style={{ color: "black" }} />
              <span className="navbar-badge badge text-bg-warning">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <span className="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="bi bi-envelope me-2" /> 4 new messages
                <span className="float-end text-secondary fs-7">3 mins</span>
              </a>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#" data-lte-toggle="fullscreen">
              <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen" style={{ color: "black" }} />
              <i
                data-lte-icon="minimize"
                className="bi bi-fullscreen-exit"
                style={{ display: "none", color: "black" }}
              />
            </a>
          </li>

          <li className="nav-item dropdown user-menu">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <img
                src="../../dist/assets/img/user2-160x160.jpg"
                className="user-image rounded-circle shadow"
                alt="User Image"
              />
              <span className="d-none d-md-inline" style={{ color: "black" }}>Alexander Pierce</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <li className="user-header text-bg-primary">
                <img
                  src="../../dist/assets/img/user2-160x160.jpg"
                  className="rounded-circle shadow"
                  alt="User Image"
                />
                <p>
                  Alexander Pierce - Web Developer
                  <small>Member since Nov. 2023</small>
                </p>
              </li>
              <li className="user-footer">
                <a href="#" className="btn btn-default btn-flat">
                  Profile
                </a>
                <a href="#" className="btn btn-default btn-flat float-end">
                  Sign out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
