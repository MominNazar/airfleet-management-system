import React, { useState } from "react";
import Navbar from "../../components/Navbar"; // Adjust the path to your Navbar component

const ContactUs = () => {
  // State to handle the visibility of the contact form
  const [showForm, setShowForm] = useState(false);

  // Function to toggle the contact form visibility
  const handleGetInTouch = () => {
    setShowForm(!showForm);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to right, #1f2937, #2d3748)",
        color: "white",
        overflowY: "auto", // Make the page scrollable
      }}
    >
      <Navbar />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "24px" }}>Contact Us</h1>
        <p style={{ fontSize: "1.25rem", maxWidth: "48rem", textAlign: "center", marginBottom: "16px" }}>
          Have questions or need help? Feel free to reach out to us using the details below.
        </p>
        <ul style={{ fontSize: "1.125rem", textAlign: "center", marginBottom: "32px", padding: 0 }}>
          <li>Email: <span style={{ color: "#F97316" }}>support@airfleet.com</span></li>
          <li>Phone: <span style={{ color: "#F97316" }}>+1 123-456-7890</span></li>
          <li>Address: <span style={{ color: "#F97316" }}>123 Aviation Plaza, Sky City</span></li>
        </ul>

        {/* Button to toggle the visibility of the form */}
        <div style={{ marginTop: "32px" }}>
          <button
            onClick={handleGetInTouch}
            style={{
              padding: "12px 24px",
              backgroundColor: "#F97316",
              color: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
          >
            Get in Touch
          </button>
        </div>

        {/* Conditional rendering of the contact form */}
        {showForm && (
          <div
            style={{
              marginTop: "32px",
              width: "100%",
              maxWidth: "28rem",
              padding: "24px",
              backgroundColor: "#2D3748",
              borderRadius: "12px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ fontSize: "2rem", fontWeight: "600", textAlign: "center", marginBottom: "24px" }}>
              Contact Form
            </h2>
            <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label htmlFor="name" style={{ display: "block", fontSize: "1rem", marginBottom: "8px" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#4A5568",
                    color: "white",
                    border: "none",
                    outline: "none",
                    transition: "border 0.3s",
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: "block", fontSize: "1rem", marginBottom: "8px" }}>
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#4A5568",
                    color: "white",
                    border: "none",
                    outline: "none",
                    transition: "border 0.3s",
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" style={{ display: "block", fontSize: "1rem", marginBottom: "8px" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#4A5568",
                    color: "white",
                    border: "none",
                    outline: "none",
                    transition: "border 0.3s",
                  }}
                  rows="4"
                  required
                ></textarea>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#F97316",
                    color: "white",
                    borderRadius: "8px",
                    transition: "background-color 0.3s",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
