import React, { useState } from 'react';
import '../App.css';

// Placeholder validation functions
// const validateEmail = (email) => {
//   return /\S+@\S+\.\S+/.test(email);
// };

// const checkPassword = (password) => {
//   return password.length >= 8;
// };

function SignupForm() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'userName') {
      setUserName(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !userName) {
      setErrorMessage('Email or username is invalid');
      return;
    }

    if (!checkPassword(password)) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    alert(`Hello ${userName}`);

    setUserName('');
    setPassword('');
    setEmail('');
    setErrorMessage('');
  };

  return (
    <div className='signup-form-background'>
    <div className="signup-form-container">
      <h1>Randoms Welcomed!</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          value={email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
          required
        />
        <input
          value={userName}
          name="userName"
          onChange={handleInputChange}
          type="text"
          placeholder="Username"
          required
        />
        <input
          value={password}
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && (
        <div className="error-text">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default SignupForm;
