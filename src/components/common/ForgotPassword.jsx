import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/forgotpassword", data); 

      alert("Password reset link sent successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to send reset link.");
    }
  };

  return (
    <div>
      <h1>Email Component</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};
