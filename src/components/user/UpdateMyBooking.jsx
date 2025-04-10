import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./FinalBooking.css";

export const UpdateMyBooking = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBookingData();
  }, [id]);

  const fetchBookingData = async () => {
    try {
      const res = await axios.get(`/reservation/getReservationById/${id}`);
      const data = res.data.data;
      Object.keys(data).forEach((key) => setValue(key, data[key]));
    } catch (error) {
      console.error("Error fetching booking data:", error);
      alert("Failed to fetch booking details.");
    }
  };

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");

    try {
      const response = await axios.put(`/reservation/updateBooking/${id}`, data);
      console.log("Booking Updated:", response.data);
      alert("Booking Updated Successfully!");
      navigate("/user/viewmybooking");
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      alert("Failed to update booking. Try again.");
    }
  };

  return (
    <div className="booking-container">
      <h1>Update Your Booking</h1>
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
        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};
