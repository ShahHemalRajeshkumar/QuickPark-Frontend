import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ProviderNavbar } from "./ProviderNavbar";
import { FiPlusSquare, FiList } from "react-icons/fi";
import { MdEventAvailable } from "react-icons/md";

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
        style={{
          zIndex: 1050, 
        }}
      >
        <div className="sidebar-brand">
          <Link to="/parkingprovider" className="brand-link" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="/assets/img/logoparking.jpg"
              alt="Logo"
              className="brand-image opacity-75 shadow"
              style={{ width: "30px", height: "30px", borderRadius: "5px" }}
            />
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
                <Link
                  to="addparking"
                  className="nav-link active"
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <FiPlusSquare size={18} />
                  <p style={{ margin: 0 }}>Add Parking</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="myparking"
                  className="nav-link"
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <FiList size={18} />
                  <p style={{ margin: 0 }}>View My Parking</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="viewbookedparking"
                  className="nav-link"
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <MdEventAvailable size={20} />
                  <p style={{ margin: 0 }}>View Booked Parking</p>
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
