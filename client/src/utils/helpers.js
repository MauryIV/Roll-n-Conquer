import { useEffect } from "react";

export function validateEmail(email) {
  const emailRegex = /^[\w\.\+\*\?\^\$\/,!#&'-=~]+@\w+\.\w{2,6}$/;
  return emailRegex.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(String(password));
}

export const useRandomTheme = (themes) => {
  useEffect(() => {
    const loadRandomTheme = () => {
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      const styleElement = document.createElement("style");
      styleElement.textContent = randomTheme;
      document.head.appendChild(styleElement);
    };
    loadRandomTheme();
  }, []);
};
