// src/components/LandingPage.js
import React from "react";
import "../Style/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Animated Background */}
      <div className="background-shapes">
        <div className="shape circle"></div>
        <div className="shape square"></div>
        <div className="shape triangle"></div>
        <div className="shape hexagon"></div>
        <div className="shape diamond"></div>
      </div>

      {/* Main Section */}
      <div className="landing-content">
        <h1>Welcome to Decentralized File Storage</h1>
        <p>
          Experience the future of file storage with IPFS — secure, fast, and
          globally accessible. Empower your files with decentralized
          technology.
        </p>
        <a href="/upload" className="cta-button">
          Start Uploading Now
        </a>
      </div>

      {/* Information Section */}
      <div className="info-section">
        <div className="info-card">
          <h2>What is IPFS?</h2>
          <p>
            IPFS (InterPlanetary File System) is a peer-to-peer network for
            storing and sharing data in a distributed system. It replaces the
            traditional web's HTTP with content-addressed storage, ensuring
            better reliability and speed.
          </p>
        </div>
        <div className="info-card">
          <h2>Core Features</h2>
          <ul className="styled-list">
            <li>
              <span className="icon">🌍</span> Decentralized file storage for
              high availability
            </li>
            <li>
              <span className="icon">⚡</span> Faster content delivery through
              distributed networks
            </li>
            <li>
              <span className="icon">🔗</span> Immutable content addressing with
              unique hash IDs
            </li>
          </ul>
        </div>
        <div className="info-card">
          <h2>Why Use IPFS?</h2>
          <ul className="styled-list">
            <li>
              <span className="icon">🔒</span> Ensure security and redundancy
              for your files
            </li>
            <li>
              <span className="icon">📤</span> Upload and retrieve files from
              anywhere in the world
            </li>
            <li>
              <span className="icon">🚀</span> Future-proof your content with
              cutting-edge technology
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>
          Join the decentralized revolution today! Start uploading your files
          with IPFS and explore the endless possibilities of distributed
          storage.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;