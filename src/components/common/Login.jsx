import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css"; 
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");

  const submitHandler = async (data) => {
    try {
      console.log("Login Data:", data);
      
      // Assign roleId based on selected role
      data.roleId = data.role === "User" 
        ? "67dae822f5afbc68f03c2d8f" 
        : "67dae8acf5afbc68f03c2d91";

      const res = await axios.post("/user/login", data);
      console.log("Server Response:", res.data);

      if (res.status === 200) {
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name); // Store role name instead of ID
      
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
      
        setTimeout(() => {
          if (res.data.data.roleId.name === "User") {
            navigate("/user"); // Show User Sidebar
          } else if (res.data.data.roleId.name === "Parking Provider") {
            navigate("/parkingowner"); // Show Parking Provider Sidebar
          } else {
            navigate("/"); // Default redirect if role is unknown
          }
        }, 3000);
      }
       else {
        setMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error: Unable to login.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="login-page">  
      <div className="login-form-container">  
        <h1 className="form-title">LOGIN</h1>  
        {message && <p className="login-message">{message}</p>}

        <form onSubmit={handleSubmit(submitHandler)}>

        {/* <div className="form-group">
            <label>Select Role</label>
            <select {...register("role")} required>
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Parking Provider">Parking Provider</option>
            </select>
          </div> */}

          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register("email")} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register("password")} required />
          </div>
          
          <div className="forgot-password">
            <Link to="/forgotpassword" className="forgot-password-link">Forgot Password?</Link>
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">Login</button>  
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};
