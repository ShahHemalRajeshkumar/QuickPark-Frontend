import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const UpdateMyParking = () => {
    const { id } = useParams();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const { register, handleSubmit, setValue, watch } = useForm();

    const stateId = watch("stateId");
    const cityId = watch("cityId");

    useEffect(() => {
        getAllStates();
        if (id) fetchParkingData();
    }, [id]);

    useEffect(() => {
        if (stateId) getCityByStateId(stateId);
    }, [stateId]);

    useEffect(() => {
        if (cityId) getAreaByCityId(cityId);
    }, [cityId]);

    const fetchParkingData = async () => {
        try {
            const res = await axios.get(`/parking/getParkingById/${id}`);
            const data = res.data.data;
            Object.keys(data).forEach((key) => setValue(key, data[key]));
        } catch (error) {
            console.error("Error fetching parking data:", error);
        }
    };

    const getAllStates = async () => {
        try {
            const res = await axios.get("/state/getallstates");
            setStates(res.data.data);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const getCityByStateId = async (stateId) => {
        try {
            const res = await axios.get(`/city/getcitybystate/${stateId}`);
            setCities(res.data.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const getAreaByCityId = async (cityId) => {
        try {
            const res = await axios.get(`/area/getareabycity/${cityId}`);
            setAreas(res.data.data);
        } catch (error) {
            console.error("Error fetching areas:", error);
        }
    };

    const submitHandler = async (data) => {
        try {
            data.userId = localStorage.getItem("id");
            if (data._id) delete data._id;

            const res = await axios.put(`/parking/updateparking/${id}`, data);
            console.log(res.data);
        } catch (error) {
            console.error("Error updating parking:", error);
        }
    };

    return (
        <div className="add-parking-container">
            <div className="form-container">
                <h1 className="form-title">🚗 Update Parking</h1>

                <form onSubmit={handleSubmit(submitHandler)} className="parking-form">
                    <div className="form-group">
                        <label>Parking Name</label>
                        <input type="text" {...register("parkingname", { required: true })} placeholder="Enter Parking Name" />
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <select {...register("stateId", { required: true })}>
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state._id} value={state._id}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <select {...register("cityId", { required: true })} disabled={!stateId}>
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city._id} value={city._id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Area</label>
                        <select {...register("areaId", { required: true })} disabled={!cityId}>
                            <option value="">Select Area</option>
                            {areas.map((area) => (
                                <option key={area._id} value={area._id}>
                                    {area.name}
                                </option>
                            ))}
                        </select>
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
                        <label>Hourly Rate</label>
                        <input type="number" {...register("hourlyRate", { required: true })} placeholder="Hourly Rate" />
                    </div>

                    <div className="form-group">
                        <label>Parking Type</label>
                        <select {...register("parkingType", { required: true })}>
                            <option value="">Select Parking Type</option>
                            <option value="Open">Open</option>
                            <option value="Covered">Covered</option>
                            <option value="Underground">Underground</option>
                            <option value="Multi-level">Multi-level</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" {...register("parkingURL", { required: true })} placeholder="Enter Image URL" />
                    </div>

                    <div className="form-group text-center">
                        <button type="submit" className="submit-button">🚀 Update Parking</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
