// Validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Password must be at least 8 characters
const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 8;
};

// Username must be alphanumeric and between 3-20 characters
const isValidUsername = (username) => {
  return /^[a-zA-Z0-9]{3,20}$/.test(username);
};

// Basic XSS prevention: strip HTML tags from input
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '');
};

module.exports = { isValidEmail, isValidPassword, isValidUsername, sanitizeInput };
