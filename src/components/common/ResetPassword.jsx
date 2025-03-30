import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
  const token = useParams().token;
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const obj = {
        token: token,
        password: data.password,
      };

      const res = await axios.post("http://localhost:3000/user/resetpassword", obj);
      console.log(res.data);

      alert("Your password has been changed successfully!"); 
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to reset password. Please try again."); 
    }
  };

  return (
    <div>
      <h1>RESET PASSWORD COMPONENT</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>NEW PASSWORD</label>
          <input type="password" {...register("password", { required: true })} />
        </div>
        <div>
          <input type="submit" value="Reset Password" />
        </div>
      </form>
    </div>
  );
};
