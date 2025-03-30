import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustLoder } from "../common/CustLoder";
import "./ViewMyBooking.css";

export const ViewMyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/reservation/getReservationsByUserId/${localStorage.getItem("id")}`);
      console.log("API Response:", res.data); 
      setBookings(res.data.data);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="view-booking-container">
      <div className="view-booking-content">
        <h2 className="view-booking-title">📅 My Bookings</h2>

        {isLoading ? (
          <CustLoder />
        ) : bookings.length > 0 ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th>PARKING NAME</th>
                <th>START TIME</th>
                <th>END TIME</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  
                  <td>{booking?.parkingId?.parkingname ? booking.parkingId.parkingname : "No Parking Name"}</td>
                  <td>{booking.startTime}</td>
                  <td>{booking.endTime}</td>
                  <td>
                    <Link to={`/user/updateBooking/${booking._id}`} className="update-button">
                      UPDATE
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-booking-message">No bookings available. Book now! 🚀</p>
        )}
      </div>
    </div>
  );
};
