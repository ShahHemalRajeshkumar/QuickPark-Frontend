import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchParking.css";

export const SearchParking = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [parkings, setParkings] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllStates();
  }, []);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    setSelectedState(id);
    const res = await axios.get(`/city/getcitybystate/${id}`);
    setCities(res.data.data);
  };

  const getAreaByCityId = async (id) => {
    setSelectedCity(id);
    const res = await axios.get(`/area/getareabycity/${id}`);
    setAreas(res.data.data);
  };

  const searchParkings = async () => {
    const res = await axios.get(`/parking/getparkingbyarea/${selectedArea}`);
    setParkings(res.data.data);
  };

  return (
    <div className="search-container">
      <h1>Search Parking Slots</h1>
      <div className="filters">
        <select onChange={(e) => getCityByStateId(e.target.value)}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state._id} value={state._id}>{state.name}</option>
          ))}
        </select>

        <select onChange={(e) => getAreaByCityId(e.target.value)} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city._id} value={city._id}>{city.name}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedArea(e.target.value)} disabled={!selectedCity}>
          <option value="">Select Area</option>
          {areas.map((area) => (
            <option key={area._id} value={area._id}>{area.name}</option>
          ))}
        </select>

        <button onClick={searchParkings} disabled={!selectedArea}>Search</button>
      </div>

      <div className="parking-grid">
        {parkings.map((parking) => (
          <div key={parking._id} className="parking-card">
            <img src="/assets/img/imageofparking.jpeg" alt="Parking" />
            <h3>{parking.parkingname}</h3>
            <p>{parking.description}</p>
            <p><strong>Total Spaces:</strong> {parking.totalSpaces}</p>
            <p><strong>Available Slots:</strong> {parking.availableSpaces}</p>
            <p><strong>Hourly Rate:</strong> ₹{parking.hourlyRate}</p>
            <button onClick={() => navigate(`/user/addvehicle/${parking._id}`)}>
              Book My Parking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
