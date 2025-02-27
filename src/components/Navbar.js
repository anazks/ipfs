// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState(null);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (token) {
      try {
        // Decode the JWT payload
        const base64Url = token.split('.')[1]; // Get the payload part of JWT
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedData = JSON.parse(atob(base64)); // Convert from Base64

        console.log("Decoded Token Data:", decodedData);

        setAdminId(decodedData.adminId); // Extract and set adminId
        console.log(adminId)
        localStorage.setItem("userId",decodedData.adminId)
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]); // Runs only when token changes

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Make sure to remove the correct token
    navigate("/login"); // Redirect to login after logout
  };

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/kepa.png" alt="KEPA" className="logo-image" />
      </div>
      <div className="navbar-logo">മൃദു ഭാവേ ദൃഢ കൃത്യേ..! </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/Files">My Files</Link>
            <Link to="/shared">Shared Files</Link>
            <Link to="/upload">Upload</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <button onClick={handleLoginClick} className="login-button">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
