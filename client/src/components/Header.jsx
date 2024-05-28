import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css'

function Navigation() {
  const currentPage = useLocation().pathname;
  return (
    <nav>
      <ul className='nav nav-tabs nav-justified'>
        <li className='nav-item'>
          <Link 
            to='/' 
            className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link 
            to='/login' 
            className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}
          >
            Login
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
          <Link 
            to='/signup' 
            className={currentPage === '/signup' ? 'nav-link active' : 'nav-link'}
          >
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function Header() {
  return (
    <header>
      <h2 className='text-center'>Roll N Konquer</h2>
      <Navigation />
    </header>
  );
}

export default Header;
