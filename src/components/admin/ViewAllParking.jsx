import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewAllParking.css";

function ViewAllParking() {
  const [parkings, setParkings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchParkings = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/parking/getAllParking");
      setParkings(res.data.data);
    } catch (error) {
      console.error("Error fetching parkings:", error);
      setParkings([]);
    }
    setIsLoading(false);
  };

  const deleteParking = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this parking?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/parking/parking/${id}`);
      alert("Parking deleted successfully!");
      fetchParkings(); 
    } catch (error) {
      console.error("Error deleting parking:", error);
      alert("Failed to delete parking.");
    }
  };

  useEffect(() => {
    fetchParkings();
  }, []);

  return (
    <div className="admin-page">
      <h2>All Parking Areas</h2>
      <div className="table-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Parking Name</th>
                <th>State</th>
                <th>City</th>
                <th>Area</th>
                <th>Total Slots</th>
                <th>Available Slots</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parkings.length > 0 ? (
                parkings.map((p) => (
                  <tr key={p._id}>
                    <td>{p.parkingname}</td>
                    <td>{p.stateId?.name || "N/A"}</td>
                    <td>{p.cityId?.name || "N/A"}</td>
                    <td>{p.areaId?.name || "N/A"}</td>
                    <td>{p.totalSpaces}</td>
                    <td>{p.availableSpaces}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteParking(p._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Parking Areas Found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ViewAllParking;
