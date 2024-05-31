import React, { useEffect } from 'react';
import '../../App.css';
import './userProfile.css';
import FriendListModal from '../../components/FriendList/FriendList';

const UserProfile = ({ user }) => {
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
