import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { data, useNavigate } from "react-router-dom";
import "./AddParking.css"; 

export const AddParking = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAllStates();
  }, []);

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

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()


  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    
    
    console.log(data);
    console.log(data.image[0])
    alert("Parking added successfully!");
  
  
  const formData = new FormData();
  formData.append("parkingname", data.parkingname);
  formData.append("stateId", data.stateId);
  formData.append("cityId", data.cityId);
  formData.append("areaId", data.areaId);
  formData.append("address", data.address);
  formData.append("totalSpaces", data.totalSpaces);
  formData.append("availableSpaces", data.availableSpaces);
  formData.append("hourlyRate", data.hourlyRate);
  formData.append("parkingType", data.parkingType);
  formData.append("userId", data.userId);
  formData.append("image",data.image[0]);
  const res = await axios.post("/parking/addwithFile", formData);
  //const res = await axios.post("http://localhost:3000/parking/addparking",formData);
  console.log(res);
  console.log(res.data);
  navigate("../myparking")
  };

  return (
    <div className="add-parking-container">
      <div className="form-container">
        <h1 className="form-title">🚗 Add Parking</h1>

        <form onSubmit={handleSubmit(submitHandler)} className="parking-form">
    
          <div className="form-group">
            <label>Parking Name</label>
            <input type="text" {...register("parkingname", { required: true })} placeholder="Enter Parking Name" />
          </div>

          
          <div className="form-group">
            <label>Address</label>
            <input type="text" {...register("address", { required: true })} placeholder="Enter Address" />
          </div>

          
          <div className="form-group">
            <label>Total Spaces</label>
            <input type="number" {...register("totalSpaces", { required: true })} placeholder="Total Spaces" />
          </div>

      
          <div className="form-group">
            <label>Available Spaces</label>
            <input type="number" {...register("availableSpaces", { required: true })} placeholder="Available Spaces" />
          </div>

          
          <div className="form-group">
            <label>Hourly Rate ($)</label>
            <input type="number" {...register("hourlyRate", { required: true })} placeholder="Hourly Rate" />
          </div>

          
          <div className="form-group">
            <label>Parking Type</label>
            <select {...register("parkingType", { required: true })}>
              <option value="Open">Open</option>
              <option value="Covered">Covered</option>
              <option value="Underground">Underground</option>
              <option value="Multi-level">Multi-level</option>
            </select>
          </div>

          
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
            <select {...register("areaId", { required: true })}>
              <option value="">Select Area</option>
              {areas?.map((area) => (
                <option key={area._id} value={area._id}>{area.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Parking URL</label>
            <input type="file" {...register("image")}/>
          </div>
          
          <div className="form-group text-center">
            <button type="submit" className="submit-button">🚀 Add Parking</button>
          </div>
        </form>
      </div>
    </div>
  );
};
