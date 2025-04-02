import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./FinalBooking.css";

export const FinalBooking = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { parkingId } = useParams();

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    data.parkingId = parkingId;
    data.vehicleId = localStorage.getItem("vehicleId"); 

    if (!data.vehicleId) {
      alert("Vehicle ID is missing! Please add a vehicle first.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/reservation/addreservation", data);
      console.log("Booking Response:", response.data);
      localStorage.setItem("reservationDetails", JSON.stringify(response.data));

      alert("Booking Successful!");
      navigate("/user/searchparking"); 
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="booking-container">
      <h1>Confirm Your Booking</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="booking-form">
        <input type="date" {...register("date", { required: true })} />
        <input type="time" {...register("startTime", { required: true })} />
        <input type="time" {...register("endTime", { required: true })} />
        <select {...register("paymentStatus", { required: true })}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
        <input type="number" {...register("securityAmountPaid", { required: true })} placeholder="Advance Payment" />
        <button type="submit">Book My Slot</button>
      </form>
    </div>
  );
};
