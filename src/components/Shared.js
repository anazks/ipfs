import React, { useEffect, useState } from 'react';

function Shared() {
  const [sharedFiles, setSharedFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedFiles = async () => {
      const userId = localStorage.getItem('userId'); // Retrieve userId

      if (!userId) {
        console.error('User ID not found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:20000/api/admin/get-all-sharedFiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }), // Send userId in the request body
        });

        const data = await response.json();
        console.log('Shared Files:', data);

        if (response.ok) {
          setSharedFiles(data); // Store received data
        } else {
          console.error('Error fetching shared files:', data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedFiles();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Shared Files</h1>

      {loading ? (
        <p>Loading...</p>
      ) : sharedFiles.length > 0 ? (
        <div style={styles.box}>
          {sharedFiles.map((obj, index) => (
            <div key={index} style={styles.row}>
              {/* <span style={styles.user}>User: {obj.user}</span> */}
              <button
                style={styles.button}
                onClick={() => window.open(`https://gateway.pinata.cloud/ipfs/${obj.hash}`, '_blank')}
              >
                View File
              </button>
             <span>{obj.createdAt}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No shared files found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  box: {
    width: '50%',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    borderRadius: '10px',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  user: {
    fontSize: '18px',
    color: '#333',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Shared;
