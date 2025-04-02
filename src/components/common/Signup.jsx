import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "./Signup.css"; 

export const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); 

  const submitHandler = async (data) => {
    try {
      data.roleId = data.role === "User" 
        ? "67dae822f5afbc68f03c2d8f" 
        : "67dae8acf5afbc68f03c2d91";

      console.log("Submitted Data:", data); 

      const res = await axios.post("/user", data); 
      console.log("Server Response:", res.data); 

      if (res.status === 201) {
        setTimeout(() => {
          toast.success("Signup successful! Redirecting to login...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
          });
        }, 500); 

        reset(); 

        setTimeout(() => {
          navigate("/login"); 
        }, 3000);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error); 
      toast.error("Error: Unable to signup.");
    }
  };

  const validationSchema = {
    firstName: {
      required: { value: true, message: "First name is required" },
      minLength: { value: 2, message: "First name must be at least 2 characters" },
    },
    lastName: {
      required: { value: true, message: "Last name is required" },
      minLength: { value: 3, message: "Last name must be at least 3 characters" },
    },
    email: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Invalid email format",
      },
    },
    password: {
      required: { value: true, message: "Password is required" },
      minLength: { value: 6, message: "Password must be at least 6 characters" },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
        message: "Password must contain at least one letter and one number",
      },
    },
    role: {
      required: { value: true, message: "Role is required" },
    },
  };

  return (
    <div className="signup-page"> 
      <div className="signup-container">
        <h1>SIGNUP</h1>
        {message && <p className="signup-message">{message}</p>}
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" {...register("firstName", validationSchema.firstName)} />
            <span className="error">{errors.firstName?.message}</span>
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" {...register("lastName", validationSchema.lastName)} />
            <span className="error">{errors.lastName?.message}</span>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register("email", validationSchema.email)} />
            <span className="error">{errors.email?.message}</span>
          </div>

          <div className="form-group">
            <label>Select Role</label>
            <select {...register("role", validationSchema.role)}>
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Parking Provider">Parking Provider</option>
            </select>
            <span className="error">{errors.role?.message}</span>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register("password", validationSchema.password)} />
            <span className="error">{errors.password?.message}</span>
          </div>

          <div className="form-group">
            <button type="submit" className="signup-btn">Sign Up</button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};
