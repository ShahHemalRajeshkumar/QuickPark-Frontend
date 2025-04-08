import React, { useEffect, useState } from "react";
import axios from "axios";
import { CustLoder } from "../common/CustLoder";
import "./ViewAllBooking.css";

function ViewAllBooking() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllBookings = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/reservation/getallreservations");
      console.log("Bookings fetched:", res.data);
      setBookings(res.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    }
    setIsLoading(false);
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/reservation/reservation/${id}`);
      alert("Booking deleted successfully!");
      getAllBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking.");
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div className="admin-page">
      <h2>All Bookings</h2>

      <div className="table-container">
        {isLoading ? (
          <CustLoder />
        ) : (
          <table>
            <thead>
              <tr>
                <th>USER</th>
                <th>VEHICLE NO</th>
                <th>VEHICLE TYPE</th>
                <th>PARKING</th>
                <th>DATE</th>
                <th>START</th>
                <th>END</th>
                <th>PAYMENT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((b) => (
                  <tr key={b._id}>
                    <td>
                      {b.userId
                        ? `${b.userId.firstName || ""} ${b.userId.lastName || ""}`.trim()
                        : "N/A"}
                    </td>
                    <td>{b.vehicleId?.registrationNumber || "N/A"}</td>
                    <td>{b.vehicleId?.vehicleType || "N/A"}</td>
                    <td>{b.parkingId?.parkingname || "N/A"}</td>
                    <td>{new Date(b.date).toLocaleDateString()}</td>
                    <td>{b.startTime}</td>
                    <td>{b.endTime}</td>
                    <td>{b.paymentStatus}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteBooking(b._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No Bookings Found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ViewAllBooking;
