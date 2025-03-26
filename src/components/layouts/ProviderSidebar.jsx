import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ProviderNavbar } from "./ProviderNavbar";

export const ProviderSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ProviderNavbar toggleSidebar={toggleSidebar} />
      <aside
        className={`app-sidebar bg-body-secondary shadow ${
          isSidebarOpen ? "open" : "d-none"
        }`}
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          <Link to="/parkingprovider" className="brand-link">
            <span className="brand-text fw-light">Parking Provider</span>
          </Link>
        </div>

        <div
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
            <ul className="nav sidebar-menu flex-column" role="menu">
              <li className="nav-item">
                <Link to="addparking" className="nav-link active">
                  <i className="nav-icon bi bi-plus-square"></i>
                  <p>Add Parking</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="myparking" className="nav-link">
                  <i className="nav-icon bi bi-list-check"></i>
                  <p>View My Parking</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/parkingprovider/bookedparking" className="nav-link">
                  <i className="nav-icon bi bi-calendar-check"></i>
                  <p>View Booked Parking</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};
