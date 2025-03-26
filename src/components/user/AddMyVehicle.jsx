import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AddMyVehicle.css"; 

export const AddMyVehicle = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");

    try {
      const res = await axios.post("http://localhost:3000/vehicle/addvehicle",data);
      console.log(res.data);
      alert("Vehicle added successfully!");
      navigate("../bookmyvehicle");
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("Failed to add vehicle. Please try again.");
    }
  };

  return (
    <div className="add-vehicle-container">
      <div className="form-container">
        <h1 className="form-title">🚗 Add Your Vehicle</h1>

        <form onSubmit={handleSubmit(submitHandler)} className="vehicle-form">
          <div className="form-group">
            <label>Registration Number</label>
            <input 
              type="text" 
              {...register("registrationNumber", { required: true })} 
              placeholder="Enter Registration Number" 
            />
          </div>

          <div className="form-group">
            <label>Vehicle Type</label>
            <select {...register("vehicleType", { required: true })}>
              <option value="">Select Vehicle Type</option>
              <option value="2Wheeler">2Wheeler</option>
              <option value="4Wheeler">4Wheeler</option>
              <option value="SUV">SUV</option>
            </select>
          </div>

          <div className="form-group text-center">
            <button type="submit" className="submit-button">🚀 Add Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
};
