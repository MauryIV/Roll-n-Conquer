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

// daily resets
function msUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return midnight - now;
}

const theDailyReset = () => {
  setTimeout(() => {
    dailyReset();
    console.log('Daily reset function executed at', new Date());
  
    // Schedule subsequent executions every 24 hours
    setInterval(dailyReset, 24 * 60 * 60 * 1000);
  }, msUntilMidnight());
}

export const dailyReset = () => {
  const now = new Date();
  console.log(now)
  // leaderboard shows days winners
}

theDailyReset();
