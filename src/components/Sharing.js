import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and URL params
import './Sharing.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // For icons
import { faShare } from '@fortawesome/free-solid-svg-icons'; // Share icon

const Sharing = () => {
  const [fileData, setFileData] = useState(null);
  const [email, setEmail] = useState(''); // State for email input
  const navigate = useNavigate();
  const { hash } = useParams(); // Extract the hash from the URL parameters

  useEffect(() => {
    const fetchFileData = async () => {
      const adminToken = localStorage.getItem('adminToken'); // Retrieve the token from local storage

      // If no token, redirect to login
      if (!adminToken) {
        navigate('/login'); // Redirect to login if token is missing
        return;
      }

      try {
        // Make the API call
        const response = await fetch(`http://localhost:20000/api/admin/singleFile/${hash}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${adminToken}`, // Set the token in the 'Authorization' header
            'Content-Type': 'application/json',
          },
        });

        // Check if the response is successful
        if (response.ok) {
          const data = await response.json();
          const firstFile = data[0]; // Select the first file if there are multiple
          setFileData(firstFile); // Save the file data to state
        } else {
          console.error('Failed to fetch file:', response.statusText);
          if (response.status === 403 || response.status === 401) {
            navigate('/login'); // Redirect to login on unauthorized access
          }
        }
      } catch (error) {
        console.error('Error fetching file:', error);
        navigate('/login'); // Redirect to login on error
      }
    };

    fetchFileData(); // Trigger the API call when the component mounts
  }, [navigate, hash]);

  // Handle form submission
  const handleShare = async (e) => {
    e.preventDefault();
    console.log('Sharing file with email:', email);
    const adminToken = localStorage.getItem('adminToken'); // Retrieve the token from local storage
    const response = await fetch('http://localhost:20000/api/admin/ShareEmail', {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, hash}), // Sending email in the request body
     
  });
  console.log(response)
  // if(response){
  //   console.log(response.data.json())
  // }
 
    // Add your logic to share the file with the entered email
  };

  // Render a loading state while fetching file data
  if (!fileData) {
    return (
      <div className="loading-container">
        {/* Form for email and share button */}
        <div className="share-form">
          <h2>Share File</h2>
          <form onSubmit={handleShare}>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              <FontAwesomeIcon icon={faShare} /> Share
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render the file data
  return (
    <div className="sharing-container">
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
        <h1>File Details</h1>
        <table className="file-details-table">
          <tbody>
            <tr>
              <td><strong>Name:</strong></td>
              <td>{fileData.name}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{fileData.email}</td>
            </tr>
            <tr>
              <td><strong>File Name:</strong></td>
              <td>{fileData.fileName}</td>
            </tr>
            <tr>
              <td><strong>File Size:</strong></td>
              <td>{fileData.fileSize} KB</td>
            </tr>
            <tr>
              <td><strong>Date of Upload:</strong></td>
              <td>{new Date(fileData.dateOfUpload).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td><strong>IPFS Hash:</strong></td>
              <td>{fileData.ipfsHash}</td>
            </tr>
            <tr>
              <td><strong>Shared With:</strong></td>
              <td>{fileData.shared.join(', ') || 'No recipients yet.'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sharing;