import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustLoder } from '../common/CustLoder';
import "./viewmyparking.css";

export const ViewMyParking = () => {
    const [screens, setscreens] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const getAllParking = async () => {
        setisLoading(true);
        const res = await axios.get(`/parking/getParkingbyuserId/${localStorage.getItem("id")}`);
        console.log(res.data);
        setscreens(res.data.data);
        setisLoading(false);
    };

    useEffect(() => {
        getAllParking();
    }, []);

    return (
        <div className="view-parking-container">
            <div className="view-parking-content">
                <h2 className="view-parking-title">MY PARKING</h2>
                {isLoading ? (
                    <CustLoder />
                ) : (
                    <table className="parking-table">
                        <thead>
                            <tr>
                                <th>PARKING NAME</th>
                                <th>IMAGE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {screens?.map((sc) => (
                                <tr key={sc._id}>
                                    <td>{sc.parkingname}</td>
                                    <td>
                                        <img className="parking-image" src={sc?.parkingURL} alt="Parking" />
                                    </td>
                                    <td>
                                        <Link to={`/updateParking/${sc._id}`} className="update-button">
                                            UPDATE
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
