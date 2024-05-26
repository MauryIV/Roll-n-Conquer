import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import LoginForm from './pages/Login';
import UserProfile from './pages/UserProfile';
import SignupForm from './pages/Signup';
import Dice from './pages/Landing';




const App = () => {
  return (
    <>
    <Header />
    <main style={{backgroundColor: 'blue'}}>
        <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default App