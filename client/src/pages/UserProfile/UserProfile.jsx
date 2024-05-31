import React, { useEffect } from 'react';
import '../../App.css';
import './userProfile.css';

const UserProfile = ({ user }) => {
  useEffect(() => {
    // Randomly assign grid areas to stat items
    const stats = document.querySelectorAll('.stat-item');
    stats.forEach(stat => {
      const row = Math.floor(Math.random() * 3) + 1;
      const col = Math.floor(Math.random() * 3) + 1;
      stat.style.gridColumn = `${col} / span 2`; // Make each item span multiple columns for more spread
      stat.style.gridRow = `${row} / span 2`; // Make each item span multiple rows for more spread
    });
  }, []);

  return (
    <div className='user-profile-background'>
      <div className="user-profile-container">
        <h1>User Profile</h1>
        <div className="stats">
          <div className="stat-item">W / L</div>
          <div className="stat-item">Win Streak</div>
          <div className="stat-item">Daily Wins</div>
          <div className="stat-item">Largest Spread</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
