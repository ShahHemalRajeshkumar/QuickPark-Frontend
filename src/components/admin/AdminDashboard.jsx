import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalParking: 0,
    totalBookings: 0,
  });

  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    datasets: [
      {
        label: "Monthly Bookings",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get("dashboard/dashboarddetails");
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    const fetchMonthlyBookings = async () => {
      try {
        const res = await axios.get("/dashboard/monthlybooking"); 
        const { months, counts } = res.data;

        setMonthlyData({
          labels: months,
          datasets: [
            {
              label: "Monthly Bookings",
              data: counts,
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching monthly bookings:", err);
      }
    };

    fetchDashboardStats();
    fetchMonthlyBookings();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stats-container">
        <div className="stat-box">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-box">
          <h3>Total Parking</h3>
          <p>{stats.totalParking}</p>
        </div>
        <div className="stat-box">
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Monthly Booking Stats</h3>
        <Bar data={monthlyData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
      </div>
    </div>
  );
};
