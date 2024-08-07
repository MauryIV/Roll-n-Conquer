import { useEffect } from 'react';
import './userProfile.css';
import FriendListModal from '../../components/FriendList/FriendList';
import { getUser } from "../../utils/userQueries";
import auth from "../../utils/auth";

const UserProfile = ({ user }) => {
  const { wins, losses, ties, streak, dailyWins } = getUser();
  useEffect(() => {
    const layouts = ['layout1', 'layout2', 'layout3', 'layout4'];

    const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];

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
          {!auth.loggedIn() ? (<></>) : (
            <div className="stats layout1">
              <div className="stat-item stat-item1">W / L / T <br />
              {wins}/{losses}/{ties}</div>
              <div className="stat-item stat-item2">Win Streak <br />
              {streak}</div>
              <div className="stat-item stat-item3">Daily Wins <br />
              {dailyWins}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
