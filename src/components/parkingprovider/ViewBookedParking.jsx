import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustLoder } from "../common/CustLoder"; 
import "./ViewBookedParking.css";

export const ViewBookedParking = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAllReservations = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:3000/reservation/getallreservations`);
            console.log(res.data);
            setBookings(res.data.data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getAllReservations();
    }, []);

    return (
        <div className="view-parking-container">
            <div className="view-parking-content">
                <h2 className="view-parking-title">PARKING SLOT BOOKED</h2>
                {isLoading ? (
                    <CustLoder />
                ) : (
                    <table className="parking-table">
                        <thead>
                            <tr>
                                <th>PARKING NAME</th>
                                <th>VEHICLE NO</th>
                                <th>DATE</th>
                                <th>START TIME</th>
                                <th>END TIME</th>
                                <th>AMOUNT PAID</th>
                                <th>PAYMENT STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td>{booking.parkingId?.parkingname || "N/A"}</td>
                                        <td>{booking.vehicleId?.registrationNumber || "N/A"}</td>
                                        <td>{new Date(booking.date).toLocaleDateString()}</td>
                                        <td>{booking.startTime}</td>
                                        <td>{booking.endTime}</td>
                                        <td>₹{booking.securityAmountPaid}</td>
                                        <td>{booking.paymentStatus}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No Bookings Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
