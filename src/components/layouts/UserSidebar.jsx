import React, { useState } from "react";
import { UserNavbar } from "./UserNavbar";
import { Link, Outlet } from "react-router-dom";
import { FaSearch, FaEye } from "react-icons/fa";

export const UserSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <UserNavbar toggleSidebar={toggleSidebar} />
      <aside
        className={`app-sidebar bg-body-secondary shadow ${
          isSidebarOpen ? "open" : "d-none"
        }`}
        data-bs-theme="dark"
        style={{
          zIndex: 1050, // ✅ Added to keep sidebar under the Logout button
        }}
      >
        <div className="sidebar-brand">
          <a href="./index.html" className="brand-link">
            <img
              src="/assets/img/logoparking.jpg"
              className="brand-image opacity-75 shadow"
              alt="Logo"
            />
            <span className="brand-text fw-light"> User Parking</span>
          </a>
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
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="searchparking" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <FaSearch size={16} />
                      <p> Search My Parking </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="viewmybooking" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <FaEye size={16} />
                      <p> View My Booking </p>
                    </Link>
                  </li>
                </ul>
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
