// FileDisplay.js
import React, { useEffect, useState } from 'react';
import { fetchAllFiles } from '../Data/fetchData'; // Import fetch function
import "../Style/AllFilesPage.css";


const FileDisplay = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllFiles();
        setFiles(data); // Set fetched files to state
      } catch (error) {
        console.error("Error loading files:", error);
      }
    };
    
    fetchData();
  }, []);

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / 1048576).toFixed(2)} MB`;
  };

  return (
    <div>
      <h1>Uploaded Files</h1>
      <div className="shape-container">
        {[...Array(7)].map((_, index) => (
          <div key={index} className={`shape shape-${index + 1}`}></div>
        ))}
      </div>
      <div className="file-list">
        {files.map((file) => (
          <div key={file._id} className="file-card">
            <h3>{file.fileName}</h3>
            <p>Size: {formatFileSize(file.fileSize)}</p>
            <p>Type: {file.fileType}</p>
            <p>IPFS Hash: {file.ipfsHash}</p>
            <p>Uploaded At: {new Date(file.uploadedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileDisplay;
