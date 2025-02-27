import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/FileUploadPage.css";
import lighthouse from '@lighthouse-web3/sdk'

const FileUploadPage = () => {
  const apiKey = '23da5ca4.73c46225e9324658be390184219fc4fe'; //replace your AKI_key
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [ipfsHash, setIpfsHash] = useState(""); // Store the IPFS hash
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      // Redirect to login page if no token exists
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleUpload = async () => {
    const adminToken = localStorage.getItem("adminToken");
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }
  
    try {
      console.log("Uploading to Lighthouse...");
      const fileName = file.name;
      const fileSize = file.size;
      // 🚀 Fix: Pass file inside an array
      const uploadResponse = await lighthouse.upload([file], apiKey);
  
      console.log(uploadResponse, "--------from Lighthouse");
  
      if (!uploadResponse || !uploadResponse.data) {
        throw new Error("Invalid response from Lighthouse");
      }
  
      const ipfsHash = uploadResponse.data.Hash;
      setIpfsHash(ipfsHash);
      setUploadStatus(`File uploaded successfully! Hash: ${ipfsHash}`);
      const backendResponse = await axios.post(
              "http://localhost:20000/api/admin/uploadData", // Updated API URL
              {
                fileName,
                fileSize,
                ipfsHash,
              },
              {
                headers: {
                  'Bearer ': `${adminToken}`, // Setting header as per the required format
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log(backendResponse,"--------from backend");
    } catch (error) {
      setUploadStatus("Error uploading to Lighthouse.");
      console.error("Lighthouse Upload Error:", error);
    }
  };
  

  // const handleUpload = async () => {
  //   if (!file) {
  //     setUploadStatus("Please select a file first.");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     console.log(formData,"--------from form data");

  //     const uploadResponse = await lighthouse.upload(
  //       formData, 
  //       apiKey
  //     );
  //     console.log(uploadResponse,"--------from light house");
  //     // Step 1: Upload file to IPFS
  //     const ipfsResponse = await axios.post(
  //       "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           pinata_api_key: "a1cd3d34dd57c971eb21",
  //           pinata_secret_api_key:
  //             "f3ba205657140b15cfcfe431190c09ea19eaf0050c729ea17736f1870fbbb2f1",
  //         },
  //       }
  //     );

  //     const ipfsHash = ipfsResponse.data.IpfsHash;
  //     const fileName = file.name;
  //     const fileSize = file.size;

  //     setIpfsHash(ipfsHash);
  //     setUploadStatus(`File uploaded to IPFS successfully! Hash: ${ipfsHash}`);

  //     // Step 2: Save hash to the backend
  //     const adminToken = localStorage.getItem("adminToken"); // Get token from localStorage

  //     if (!adminToken) {
  //       setUploadStatus("Admin token missing. Please login again.");
  //       return;
  //     }

  //     // Sending the header with the 'Bearer' token format you specified
  //     const backendResponse = await axios.post(
  //       "http://localhost:20000/api/admin/uploadData", // Updated API URL
  //       {
  //         fileName,
  //         fileSize,
  //         ipfsHash,
  //       },
  //       {
  //         headers: {
  //           'Bearer ': `${adminToken}`, // Setting header as per the required format
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     setUploadStatus(
  //       `File metadata saved successfully! IPFS Hash: ${backendResponse.data.fileMetadata.ipfsHash}`
  //     );
  //   } catch (error) {
  //     setUploadStatus(
  //       "Error uploading file or saving metadata. Please try again."
  //     );
  //     console.error(error);
  //   }
  // };

  return (
    <div className="file-upload-container">
      <div className="animated-background">
        {/* Add background shapes */}
        <div className="shape floating-circle"></div>
        <div className="shape floating-square"></div>
        <div className="shape floating-triangle"></div>
      </div>

      <div className="content-box">
        <h1>Effortless File Management with IPFS</h1>
        <h2>Secure, Decentralized, and Easy to Use</h2>
        <p>
          Upload your files to the InterPlanetary File System (IPFS) and store
          them securely in a decentralized network. With our simple interface,
          you can manage and share your files seamlessly.
        </p>
        <p>
          IPFS ensures fast and reliable file storage by eliminating dependency
          on centralized servers. Take your file management to the next level
          with a revolutionary solution.
        </p>
        <p>
          Select a file below, and let our system handle the rest. Your data is
          important, and we ensure it remains safe and accessible.
        </p>

        <div className="upload-section">
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
          />
          <button
            className="upload-button"
            onClick={handleUpload}
            disabled={!file}
          >
            {file ? "Upload Now" : "Choose File"}
          </button>
        </div>

        {uploadStatus && (
          <div className="upload-success">
            <p>{uploadStatus}</p>
            {ipfsHash && (
              <p>
                Access your uploaded file via the IPFS link:{" "}
                <a
                  href={`https://ipfs.io/ipfs/${ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`https://ipfs.io/ipfs/${ipfsHash}`}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadPage;
