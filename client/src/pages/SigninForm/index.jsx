import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../../utils/helpers";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../../utils/mutations";
import "../../App.css";
import Auth from "../../utils/auth";

import { loginSignup1 } from "./style";

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

  const [signupForm, setSignupForm] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { loginError }] = useMutation(LOGIN_USER);
  const [add, { addError }] = useMutation(ADD_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "loginUsername":
        setLoginUsername(value);
        break;
      case "loginPassword":
        setLoginPassword(value);
        break;
      case "signupEmail":
        setSignupEmail(value);
        break;
      case "signupUsername":
        setSignupUsername(value);
        break;
      case "signupPassword":
        setSignupPassword(value);
        break;
      default:
        break;
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (name === "loginUsername" && !value.trim()) {
      setErrorMessage("Invalid Username");
    } else if (name === "loginPassword" && !value.trim()) {
      setErrorMessage("Invalid Password");
    } else if (name === "signupEmail" && !validateEmail(value)) {
      setErrorMessage("Email is invalid");
    } else if (name === "signupUsername" && !value.trim()) {
      setErrorMessage("Invalid Username");
    } else if (name === "signupPassword" && !value.trim()) {
      setErrorMessage("Invalid Password");
    } else {
      setErrorMessage("");
    }
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();

    if (!loginUsername || !loginPassword) {
      setErrorMessage("Form not completed");
      return;
    }

    try {
      const { data } = await login({
        variables: { username: loginUsername, password: loginPassword },
      });

      const { token } = data.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setErrorMessage("");
    setLoginUsername("");
    setLoginPassword("");
  };

  const handleSignupForm = async (e) => {
    e.preventDefault();

    if (!signupEmail || !signupUsername || !signupPassword) {
      setErrorMessage("Form not completed");
      return;
    } else if (!validatePassword(signupPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters long with at least one; lowercase, uppercase, digit and special charater ie:@$!%*?&"
      );
      return;
    }

    try {
      const { data } = await add({
        variables: {
          email: signupEmail,
          username: signupUsername,
          password: signupPassword,
        },
      });

      const { token } = data.addUser;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setErrorMessage("");
    setSignupEmail("");
    setSignupUsername("");
    setSignupPassword("");
  };

  const toggleSignupForm = () => {
    setErrorMessage("");
    setSignupForm(!signupForm); // Toggle the signupForm state
  };

  return (
    <div className="auth-container">
      {signupForm ? (
        <div className="signup-form-background">
          <div className="signup-form-container">
            <h1>Randoms Welcomed!</h1>
            <form className="form" onSubmit={handleSignupForm}>
              <label htmlFor="signupEmail">Email:</label>
              <input
                value={signupEmail}
                name="signupEmail"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                type="email"
                placeholder="Email"
                required
              />
              <label htmlFor="signupUsername">Username:</label>
              <input
                value={signupUsername}
                name="signupUsername"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                type="text"
                placeholder="Username"
                required
              />
              <label htmlFor="signupPassword">Password:</label>
              <input
                value={signupPassword}
                name="signupPassword"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                type="password"
                placeholder="Password"
                required
              />
              <button type="submit" className="signup-button">
                Signup!
              </button>
              <button
                type="button"
                className="login-button"
                onClick={toggleSignupForm}
              >
                Signup Already?
              </button>
            </form>
            {addError ||
              (errorMessage && (
                <div className="error-text">
                  <p>{signupError ? signupError.message : errorMessage}</p>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="login-form-container">
          <h1>Welcome back Rando!</h1>
          <form onSubmit={handleLoginForm} className="login-form">
            <div className="form-group">
              <label htmlFor="loginUsername">Username:</label>
              <input
                type="text"
                name="loginUsername"
                value={loginUsername}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password:</label>
              <input
                type="password"
                name="loginPassword"
                value={loginPassword}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <button
              type="button"
              className="signup-button"
              onClick={toggleSignupForm}
            >
              Signup?
            </button>
          </form>
          {loginError ||
            (errorMessage && (
              <div className="error-text">
                <p>{loginError ? loginError.message : errorMessage}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SigninForm;
