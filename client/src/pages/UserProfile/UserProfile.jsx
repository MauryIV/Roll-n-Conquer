import React, { useEffect } from 'react';
import './userProfile.css';
import FriendListModal from '../../components/FriendList/FriendList';
import { getUser } from "../../utils/userQueries";

const UserProfile = ({ user }) => {
  useEffect(() => {
    const layouts = ['layout1', 'layout2', 'layout3', 'layout4'];

const { userinfo } = getUser();


console.log(userinfo);

    // Select a random layout
    const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];

    // Apply the random layout to the stats container
    const statsContainer = document.querySelector('.stats');
    if (statsContainer) {
      statsContainer.classList.remove('layout1', 'layout2', 'layout3', 'layout4');
      statsContainer.classList.add(randomLayout);
    }
  }, []);

  return (
    <div className='user-profile-background'>
      <div className="user-profile-container">
        <FriendListModal />
        <div className="stats-container">
          <h1 className="profile-title">User Profile</h1>
          <div className="stats layout1">
            <div className="stat-item stat-item1">W / L</div>
            <div>{userinfo.wins}</div>
            <div className="stat-item stat-item2">Win Streak</div>
            <div className="stat-item stat-item3">Daily Wins</div>
            <div className="stat-item stat-item4">Largest Spread</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
