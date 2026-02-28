const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const User = require('../models/User');

const DASHBOARD_URL = '/account/dashboard.html';

// Limit login/register to 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts, please try again later.' }
});

// POST /auth/register — Create a new user account
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create user (password hashing handled by pre-save hook in User model)
    const user = new User({ username, email, password });
    await user.save();

    // Set session and redirect to dashboard
    req.session.userId = user._id;
    res.redirect(DASHBOARD_URL);
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// POST /auth/login — Authenticate an existing user
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // --- Streak logic ---
    const now = new Date();
    const lastActive = user.streak.lastActive;

    if (lastActive) {
      const hoursSinceLast = (now - lastActive) / (1000 * 60 * 60);

      if (hoursSinceLast >= 24 && hoursSinceLast <= 48) {
        // Logged in within the streak window — increment streak
        user.streak.current += 1;
      } else if (hoursSinceLast > 48) {
        // More than 48 hours — reset streak
        user.streak.current = 1;
      }
      // If less than 24 hours, no change (same day login)
    } else {
      // First login ever
      user.streak.current = 1;
    }

    user.streak.lastActive = now;
    await user.save();

    // Set session and redirect to dashboard
    req.session.userId = user._id;
    res.redirect(DASHBOARD_URL);
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /auth/logout — Destroy session and redirect home
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
