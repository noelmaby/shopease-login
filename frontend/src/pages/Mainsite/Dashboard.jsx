import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import { ClipLoader } from 'react-spinners';

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/profile');
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    // Call the fetchUserProfile function once after the page loads
    fetchUserProfile();

    // Set up interval to refresh data every 60 seconds
    const interval = setInterval(fetchUserProfile, 60000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

  return (
    <div>
      <h1>Dashboard</h1>
      {loading ? (
        <div className="spinner">
          <ClipLoader color="#000" loading={loading} size={50} />
        </div>
      ) : (
        user ? (
          <h1>Hi {user.name}!</h1>
        ) : (
          <h1>User profile not available</h1>
        )
      )}
    </div>
  );
};

export default Dashboard;
