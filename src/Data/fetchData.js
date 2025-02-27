// fetchData.js
const API_URL = 'http://localhost:9320/files';  // Your API endpoint

// Function to fetch all files from the backend
export const fetchAllFiles = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};
