import React, { useState, useEffect } from 'react';
import './profile.css'; 
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // استرجاع بيانات المستخدم عند تحميل المكون
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // استرجاع بيانات المستخدم من الخادم
      const response = await axios.get('/api/user/profile');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      {userData && (
        <div className="profile-info">
          <div className="profile-item">
            <span className="profile-label">Name:</span>
            <span className="profile-value">{userData.name}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Age:</span>
            <span className="profile-value">{userData.age}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{userData.email}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
