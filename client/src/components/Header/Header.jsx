import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import '../../App.css';
import './header.css';

function Navigation() {
  const currentPage = useLocation().pathname;
  return (
    <nav id="custom-nav">
      <ul className='nav nav-tabs nav-justified'>
        <li id='custom-nav' className='nav-item'>
          <Link 
            to='/' 
            className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link 
            to='/profile' 
            className={currentPage === '/profile' ? 'nav-link active' : 'nav-link'}
          >
            Profile
          </Link>
        </li>
        <li className='nav-item'>
          <Link 
            to='/roll' 
            className={currentPage === '/roll' ? 'nav-link active' : 'nav-link'}
          >
            Roll
          </Link>
        </li>
        <li className='nav-item'>
          {Auth.loggedIn() ? (
            <Link 
              to='/' 
              className='nav-link' 
              onClick={Auth.logout}
            >
              Signout
            </Link>
          ) : (
          <Link 
            to='/signin' 
            className={currentPage === '/signin' ? 'nav-link active' : 'nav-link'}
          >
            Signin
          </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

function Header() {
  return (
    <header>
      <h1 className='text-center'>Roll N Konquer</h1>
      <Navigation />
    </header>
  );
}

export default Header;
