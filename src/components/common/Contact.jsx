import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import "./Contact.css"; // Import the CSS file

export const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/contact/addcontact", data);
      console.log("Response:", res.data);
      alert("Your message has been sent successfully!");
      reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send the message. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form-box">
        <h1 className="contact-heading">Contact Us</h1>
        <p className="contact-subtext">Have any questions or feedback? Send us a message!</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Name Field */}
          <div>
            <label className="contact-label">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="contact-input"
            />
            {errors.name && <p className="contact-error">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="contact-label">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              className="contact-input"
            />
            {errors.email && <p className="contact-error">{errors.email.message}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="contact-label">Phone</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              className="contact-input"
            />
            {errors.phone && <p className="contact-error">{errors.phone.message}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label className="contact-label">Message</label>
            <textarea
              {...register("message", { required: "Message is required" })}
              rows="4"
              className="contact-textarea"
            ></textarea>
            {errors.message && <p className="contact-error">{errors.message.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="contact-button">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};


