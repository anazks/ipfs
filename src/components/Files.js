import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Files.css"; // Import the CSS file

const MyFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyFiles = async () => {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        navigate("/login"); // Redirect to login if token is not available
        return;
      }

      try {
        const response = await fetch("http://localhost:20000/api/admin/myfiles", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`, // Set the token in the 'Authorization' header
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }

        const data = await response.json();
        setFiles(data.files); // Access the "files" key from the API response
      } catch (error) {
        console.error("Error fetching files:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyFiles();
  }, [navigate]);

  // Handle "View/Access File"
  const handleViewFile = (ipfsHash) => {
    const url = `https://gateway.lighthouse.storage/ipfs/${ipfsHash}`;
    window.open(url, "_blank"); // Open the file in a new tab
  };
  
  // Handle "Sharing Center"
  const handleSharingCenter = (fileId) => {
    navigate(`/SharingCenter/${fileId}`); // Navigate to the Sharing Center with file ID
  };

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
        <div className="shape floating-pentagon"></div>
        <div className="shape floating-heart"></div>
      </div>
      <div className="content-box">
        <h1>My Files</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {files.length > 0 ? (
              <table className="profile-table">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>File Size</th>
                    <th>Date of Upload</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file._id}>
                      <td>{file.fileName}</td>
                      <td>{(file.fileSize / 1024).toFixed(2)} KB</td>
                      <td>{new Date(file.dateOfUpload).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="button"
                          onClick={() => handleViewFile(file.ipfsHash)}
                        >
                          View/Access File
                        </button>
                        <button
                          className="button"
                          onClick={() => handleSharingCenter(file.ipfsHash)}
                        >
                          Sharing Center
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No files found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFiles;
