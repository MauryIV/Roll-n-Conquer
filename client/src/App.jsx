import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import './App.css';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="content-container">
          <div className="main-content">
            <Outlet />
          </div>
          {location.pathname !== '/' && (
            <aside className="leaderboard-container">
              <Leaderboard />
            </aside>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
