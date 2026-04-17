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

    // Set session; return JSON for API clients, redirect for browser form posts
    req.session.userId = user._id;
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ success: true, user: { username: user.username, points: user.points } });
    }
    res.redirect(DASHBOARD_URL);
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Helper functions for calendar day streak calculation
function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDayDifference(currentDate, previousDate) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.round(
    (startOfLocalDay(currentDate) - startOfLocalDay(previousDate)) / MS_PER_DAY
  );
}

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

    // --- Streak logic (calendar day-based) ---
    const now = new Date();
    const lastActive = user.streak.lastActive ? new Date(user.streak.lastActive) : null;

    if (lastActive) {
      const dayDifference = getDayDifference(now, lastActive);

      if (dayDifference === 1) {
        // Logged in exactly one calendar day apart — increment streak
        user.streak.current += 1;
      } else if (dayDifference > 1) {
        // More than one day since last login — reset streak
        user.streak.current = 1;
      }
      // If dayDifference === 0 (same day), no change
    } else {
      // First login ever
      user.streak.current = 1;
    }

    user.streak.lastActive = now;
    await user.save();

    // Set session; return JSON for API clients, redirect for browser form posts
    req.session.userId = user._id;
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ success: true, user: { username: user.username, points: user.points } });
    }
    res.redirect(DASHBOARD_URL);
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /auth/logout — Destroy session and redirect home
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ success: true });
    }
    res.redirect('/');
  });
});

// GET /auth/me — Return current user info or { loggedIn: false }
router.get('/me', authLimiter, async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.json({ loggedIn: false });
    }
    const user = await User.findById(req.session.userId)
      .select('username email avatar points streak')
      .lean();
    if (!user) {
      return res.json({ loggedIn: false });
    }
    res.json({ loggedIn: true, user });
  } catch (err) {
    console.error('Auth me error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
