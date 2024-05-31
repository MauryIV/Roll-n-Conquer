export function validateEmail(email) {
  const emailRegex = /^[\w\.\+\*\?\^\$\/,!#&'-=~]+@\w+\.\w{2,6}$/;
  return emailRegex.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(String(password));
}