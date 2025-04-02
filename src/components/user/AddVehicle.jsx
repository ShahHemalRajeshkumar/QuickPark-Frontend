import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./AddVehicle.css"; 
import axios from "axios";

export const AddVehicle = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { parkingId } = useParams(); 

  console.log("Extracted parkingId:", parkingId);

  if (!parkingId) {
    alert("Parking ID is missing. Please try again.");
    return;
  }

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    data.parkingId = parkingId;

    console.log("Submitting data:", data);

    try {
      const response = await axios.post("http://localhost:3000/vehicle/addvehicle", data);
      console.log("Vehicle added successfully:", response.data);

      if (response.status === 201) {
        localStorage.setItem("vehicleId", response.data.data._id); // Store vehicleId in local storage
        alert("Your vehicle has been added successfully!");
        navigate(`/user/finalbooking/${parkingId}`);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error adding vehicle:", error.response?.data || error.message);
      alert("Failed to add vehicle. Please try again.");
    }
  };

  return (
    <div className="vehicle-container">
      <h1>Add Your Vehicle</h1>
      <form onSubmit={handleSubmit(submitHandler)} className="vehicle-form">
        <input type="text" {...register("registrationNumber", { required: true })} placeholder="Vehicle Number" />
        <select {...register("vehicleType", { required: true })}>
          <option value="">Select Vehicle Type</option>
          <option value="2Wheeler">2-Wheeler</option>
          <option value="4Wheeler">4-Wheeler</option>
          <option value="SUV">SUV</option>
        </select>
        <button type="submit">Add My Vehicle & Book Slot</button>
      </form>
    </div>
  );
};
