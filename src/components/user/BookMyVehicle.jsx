import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./BookMyVehicle.css"; 

export const BookMyVehicle = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get(`/city/getcitybystate/${id}`);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get(`/area/getareabycity/${id}`);
    setAreas(res.data.data);
  };

  const getParkingByAreaId = async (id) => {
    const res = await axios.get(`/parking/getparkingbyarea/${id}`);
    setParkings(res.data.data);
  };

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");

    console.log(data);
    alert("Vehicle parking booked successfully!");

    try {
      const res = await axios.post("/reservation/addreservation", data);
      console.log(res.data);
     // navigate("../myreservations");
    } catch (error) {
      console.error("Error booking parking:", error);
      alert("Failed to book parking. Please try again.");
    }
  };

  return (
    <div className="book-vehicle-container">
      <div className="form-container">
        <h1 className="form-title">🚗 Book Your Vehicle Parking</h1>

        <form onSubmit={handleSubmit(submitHandler)} className="parking-form">
        
          <div className="form-group">
            <label>Select State</label>
            <select {...register("stateId", { required: true })} onChange={(event) => getCityByStateId(event.target.value)}>
              <option value="">Select State</option>
              {states?.map((state) => (
                <option key={state._id} value={state._id}>{state.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select City</label>
            <select {...register("cityId", { required: true })} onChange={(event) => getAreaByCityId(event.target.value)}>
              <option value="">Select City</option>
              {cities?.map((city) => (
                <option key={city._id} value={city._id}>{city.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Area</label>
            <select {...register("areaId", { required: true })} onChange={(event) => getParkingByAreaId(event.target.value)}>
              <option value="">Select Area</option>
              {areas?.map((area) => (
                <option key={area._id} value={area._id}>{area.name}</option>
              ))}
            </select>
          </div>

           <div className="form-group">
            <label>Select Parking</label>
            <select {...register("parkingId", { required: true })}>
              <option value="">Select Parking</option>
              {parkings?.map((parking) => (
                <option key={parking._id} value={parking._id}>{parking.parkingname}</option>
              ))}
            </select>
          </div> 
          <div className="form-group">
            <label>Address</label>
            <input type="text" {...register("address", { required: true })} placeholder="Enter Address" />
          </div>
            <div className="form-group">
            <label>Available Spaces</label>
            <input type="number" {...register("availableSpaces", { required: true })} placeholder="Available Spaces" />
          </div>

          <div className="form-group">
            <label>Select Date</label>
            <input type="date" {...register("date", { required: true })} />
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input type="time" {...register("startTime", { required: true })} />
          </div>

          <div className="form-group">
            <label>End Time</label>
            <input type="time" {...register("endTime", { required: true })} />
          </div>

          <div className="form-group">
            <label>Payment Status</label>
            <select {...register("paymentStatus", { required: true })}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Security Amount Paid</label>
            <input type="number" {...register("securityAmountPaid", { required: true })} placeholder="Enter Security Amount" />
          </div>

          <div className="form-group text-center">
            <button type="submit" className="submit-button">🚀 Book Vehicle Parking</button>
          </div>
        </form>
      </div>
    </div>
  );
};
