// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import FileUploadPage from "./components/FileUploadPage";
import Navbar from "./components/Navbar";
import LoginPage from  './components/LoginPage';
import ProfilePage from './components/Profile';
import Files from './components/Files';
import Sharing from './components/Sharing';
import Shared from "./components/Shared";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<FileUploadPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/Files" element={<Files />} />
        <Route path="/shared" element={<Shared />} />
        <Route path="/SharingCenter/:hash" element={<Sharing />} />
      </Routes>
    </Router>
  );
};

export default App;
