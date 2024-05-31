import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../../utils/helpers";
import "../../App.css";
// import { signinStatus } from "../../utils/auth";

import { loginSignup1 } from "./style";

const signinStatus = true

const themes = [loginSignup1];

const loadRandomTheme = () => {
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const styleElement = document.createElement("style");
  styleElement.textContent = randomTheme;
  document.head.appendChild(styleElement);
};

const SigninForm = () => {
  useEffect(() => {
    loadRandomTheme();
  }, []);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { field, value } = e.target;
    switch (field) {
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleInputBlur = (e) => {
    const { field, value } = e.target;
    if (field === "email" && !validateEmail(value)) {
      setErrorMessage("Email is invalid");
    } else if (field === "username" && !value.trim()) {
      setErrorMessage("Invalid Username");
    } else if (field === "Password" && !value.trim()) {
      setErrorMessage("Invalid Password");
    } else {
      setErrorMessage("");
    }
  };

  const handleLoginForm = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Form not completed");
      return;
    }
    setErrorMessage("");
    setUsername("");
    setPassword("");
  };

  const handleSignupForm = (e) => {
    e.preventDefault();
    if (!email || !username || !password) {
      setErrorMessage("Form not completed");
      return;
    } else if (!validatePassword(password)) {
      setErrorMessage("Invalid Password");
      setPassword("");
      return;
    }
    setErrorMessage("");
    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="auth-container">
      {signinStatus ? (
        <div className="login-form-container">
          <h1>Welcome back Rando!</h1>
          <form onSubmit={handleLoginForm} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <button type="submit" className="signup-button">
              Signup?
            </button>
          </form>
          {errorMessage && (
            <div className="error-text">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="signup-form-background">
          <div className="signup-form-container">
            <h1>Randoms Welcomed!</h1>
            <form className="form" onSubmit={handleSignupForm}>
              <input
                value={email}
                name="email"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                type="email"
                placeholder="Email"
                required
              />
              <input
                value={username}
                name="username"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                type="text"
                placeholder="Username"
                required
              />
              <input
                value={password}
                name="password"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                type="password"
                placeholder="Password"
                required
              />
              <button type="submit">Signup!</button>
            </form>
            {errorMessage && (
              <div className="error-text">
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SigninForm;
