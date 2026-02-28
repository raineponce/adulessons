// Middleware to protect routes that require a logged-in user
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }

  // If the request expects JSON (AJAX), return a 401 JSON response
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Otherwise redirect to the login page
  res.redirect('/login.html');
};

module.exports = { requireAuth };
