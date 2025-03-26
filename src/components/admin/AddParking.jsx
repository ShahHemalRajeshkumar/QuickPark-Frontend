import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./AddParking.css"; // Importing the external CSS file

export const AddParking = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("/city/getcitybystate/" + id);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    const res = await axios.get("/area/getareabycity/" + id);
    setAreas(res.data.data);
  };

  useEffect(() => {
    getAllStates();
  }, []);

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    const userId = localStorage.getItem("id");
    data.userId = userId;
    const res = await axios.post("http://localhost:3000/parking/addparking", data);
    console.log(res.data);
    alert("Parking added successfully!");
  };

  return (
    <div className="add-parking-container">
      <div className="form-container">
        <h1 className="form-title">🚗 Add Parking</h1>

        <form onSubmit={handleSubmit(submitHandler)} className="parking-form">
          {/* Parking Name */}
          <div className="form-group">
            <label>Parking Name</label>
            <input type="text" {...register("parkingname", { required: true })} placeholder="Enter Parking Name" />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>
            <input type="text" {...register("address", { required: true })} placeholder="Enter Address" />
          </div>

          {/* Total Spaces */}
          <div className="form-group">
            <label>Total Spaces</label>
            <input type="number" {...register("totalSpaces", { required: true })} placeholder="Total Spaces" />
          </div>

          {/* Available Spaces */}
          <div className="form-group">
            <label>Available Spaces</label>
            <input type="number" {...register("availableSpaces", { required: true })} placeholder="Available Spaces" />
          </div>

          {/* Hourly Rate */}
          <div className="form-group">
            <label>Hourly Rate ($)</label>
            <input type="number" {...register("hourlyRate", { required: true })} placeholder="Hourly Rate" />
          </div>

          {/* Parking Type */}
          <div className="form-group">
            <label>Parking Type</label>
            <select {...register("parkingType", { required: true })}>
              <option value="Open">Open</option>
              <option value="Covered">Covered</option>
              <option value="Underground">Underground</option>
              <option value="Multi-level">Multi-level</option>
            </select>
          </div>

          {/* State Selection */}
          <div className="form-group">
            <label>Select State</label>
            <select {...register("stateId", { required: true })} onChange={(event) => getCityByStateId(event.target.value)}>
              <option value="">Select State</option>
              {states?.map((state) => (
                <option key={state._id} value={state._id}>{state.name}</option>
              ))}
            </select>
          </div>

          {/* City Selection */}
          <div className="form-group">
            <label>Select City</label>
            <select {...register("cityId", { required: true })} onChange={(event) => getAreaByCityId(event.target.value)}>
              <option value="">Select City</option>
              {cities?.map((city) => (
                <option key={city._id} value={city._id}>{city.name}</option>
              ))}
            </select>
          </div>

          {/* Area Selection */}
          <div className="form-group">
            <label>Select Area</label>
            <select {...register("areaId", { required: true })}>
              <option value="">Select Area</option>
              {areas?.map((area) => (
                <option key={area._id} value={area._id}>{area.name}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="form-group text-center">
            <button type="submit" className="submit-button">🚀 Add Parking</button>
          </div>
        </form>
      </div>
    </div>
  );
};
