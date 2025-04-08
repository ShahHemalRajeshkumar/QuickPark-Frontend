import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { AgencyNavbar } from "./AgencyNavbar";

export const AgencySidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AgencyNavbar toggleSidebar={toggleSidebar} />
      <aside
        className={`app-sidebar bg-body-secondary shadow ${
          isSidebarOpen ? "open" : "d-none"
        }`}
        data-bs-theme="dark"
        style={{
          zIndex: 1050, 
          
        }}
      >
        <div className="sidebar-brand">
          <a href="./index.html" className="brand-link">
            <img
              src="/assets/img/logoparking.jpg"
              className="brand-image opacity-75 shadow"
              alt="Logo"
            />
            <span className="brand-text fw-light"> Admin Dashboard</span>
          </a>
        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false">
              <li className="nav-item menu-open">
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="admindeshboard" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <MdSpaceDashboard size={16} />
                      <p> Dashboard </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="userdetail" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <FaEye size={16} />
                      <p> View Users Detail </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="viewallbooking" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <FaEye size={16} />
                      <p> View All Booking </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="viewallparking" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <FaEye size={16} />
                      <p> View All Parking </p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="app-main">
        <Outlet></Outlet>
      </main>
    </>
  );
};
