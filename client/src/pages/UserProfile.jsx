// src/UserProfile.js
import React from 'react';
import '../App.css'

const UserProfile = ({ user }) => {
  return (
    <div className='user-profile-background'>
    <div className="user-profile-container">
      <h1>User Profile</h1>
      <div className="stats">
        <div className="stat-item">
          <h2>W / L</h2>
          {/* <p>{user.wins} / {user.losses}</p> */}
        </div>
        <div className="stat-item">
          <h2>Win Streak</h2>
          {/* <p>{user.winStreak}</p> */}
        </div>
        <div className="stat-item">
          <h2>Daily Wins</h2>
          {/* <p>{user.dailyWins}</p> */}
        </div>
        <div className="stat-item">
          <h2>Largest Spread</h2>
          {/* <p>{user.largestSpread}</p> */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
