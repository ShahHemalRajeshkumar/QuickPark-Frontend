import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";


export const UpdateMyBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, watch } = useForm();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [parkings, setParkings] = useState([]);

    const stateId = watch("stateId");
    const cityId = watch("cityId");
    const areaId = watch("areaId");

    useEffect(() => {
        getAllStates();
        fetchBookingData();
    }, [id]);

    useEffect(() => {
        if (stateId) getCityByStateId(stateId);
    }, [stateId]);

    useEffect(() => {
        if (cityId) getAreaByCityId(cityId);
    }, [cityId]);

    useEffect(() => {
        if (areaId) getParkingByAreaId(areaId);
    }, [areaId]);

    const fetchBookingData = async () => {
        try {
            const res = await axios.get(`/reservation/getReservationById/${id}`);
            const data = res.data.data;
            Object.keys(data).forEach((key) => setValue(key, data[key]));
        } catch (error) {
            console.error("Error fetching booking data:", error);
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

    const getParkingByAreaId = async (areaId) => {
        try {
            const res = await axios.get(`/parking/getparkingbyarea/${areaId}`);
            setParkings(res.data.data);
        } catch (error) {
            console.error("Error fetching parkings:", error);
        }
    };

    const submitHandler = async (data) => {
        try {
            data.userId = localStorage.getItem("id");
            if (data._id) delete data._id;

            const res = await axios.put(`/reservation/updateBooking/${id}`, data);
            console.log("Booking updated:", res.data);
            alert("Booking updated successfully!");
            navigate("/user/viewmybooking");
        } catch (error) {
            console.error("Error updating booking:", error);
            alert("Failed to update booking. Please try again.");
        }
    };

    return (
        <div className="book-vehicle-container">
            <div className="form-container">
                <h1 className="form-title">📝 Update Your Booking</h1>

                <form onSubmit={handleSubmit(submitHandler)} className="parking-form">
                
                    <div className="form-group">
                        <label>Select State</label>
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
                        <label>Select City</label>
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
                        <label>Select Area</label>
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
                        <label>Select Parking</label>
                        <select {...register("parkingId", { required: true })} disabled={!areaId}>
                            <option value="">Select Parking</option>
                            {parkings.map((parking) => (
                                <option key={parking._id} value={parking._id}>
                                    {parking.parkingname}
                                </option>
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
                        <button type="submit" className="submit-button">🔄 Update Booking</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
