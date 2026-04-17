// Validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Password must be at least 8 characters
const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 8;
};

// Display name must be 2-50 characters: letters, numbers, spaces, underscores, hyphens
const isValidUsername = (username) => {
  return /^[a-zA-Z0-9 _\-]{2,50}$/.test(username);
};

// Basic XSS prevention: encode HTML special characters to prevent injection
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

module.exports = { isValidEmail, isValidPassword, isValidUsername, sanitizeInput };
