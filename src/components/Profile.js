import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../Style/Profile.css'; // Import the CSS file

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const adminToken = localStorage.getItem('adminToken'); // Retrieve the token from local storage

      // If no token, redirect to login
      if (!adminToken) {
        navigate('/login'); // Redirect to login if token is missing
        return;
      }
      try {
        // Make the API call
        const response = await fetch('http://localhost:20000/api/admin/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`, // Set the token in the 'Authorization' header
            'Content-Type': 'application/json',
          },
        });

        // Check if the response is successful
        if (response.ok) {
          const data = await response.json();
          setProfileData(data); // Save the profile data to state
        } else {
          console.error('Failed to fetch profile:', response.statusText);
          if (response.status === 403 || response.status === 401) {
            navigate('/login'); // Redirect to login on unauthorized access
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login'); // Redirect to login on error
      }
    };

    fetchProfile(); // Trigger the API call when the component mounts
  }, [navigate]);

  // Render a loading state while fetching profile data
  if (!profileData) {
    return <div>Loading...</div>;
  }

  // Render the profile data
  return (
    <div className="file-upload-container">
      <div className="animated-background">
        <div className="shape floating-circle"></div>
        <div className="shape floating-square"></div>
        <div className="shape floating-triangle"></div>
        <div className="shape floating-hexagon"></div>
        <div className="shape floating-star"></div>
        <div className="shape floating-diamond"></div>
        <div className="shape floating-ellipse"></div>
      </div>
      <div className="content-box">
        <h1>Admin Profile</h1>
        <table className="profile-table">
          <tbody>
            <tr>
              <td><strong>Name:</strong></td>
              <td>{profileData.name}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{profileData.email}</td>
            </tr>
            <tr>
              <td><strong>Files Uploaded:</strong></td>
              <td>{profileData.fileCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;