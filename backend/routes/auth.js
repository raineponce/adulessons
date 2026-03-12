const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const User = require('../models/User');

// Limit login/register to 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts, please try again later.' }
});

// Validation regexes
const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.com$/i;

// GET /auth/me — Return current session user or loggedIn: false
router.get('/me', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.json({ loggedIn: false });
    }

    const user = await User.findById(req.session.userId).select('username email avatar points streak');
    if (!user) {
      return res.json({ loggedIn: false });
    }

    res.json({
      loggedIn: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        points: user.points,
        streak: { current: user.streak.current, lastActive: user.streak.lastActive }
      }
    });
  } catch (err) {
    console.error('Me error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /auth/register — Create a new user account
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate inputs
    if (!username || !USERNAME_REGEX.test(username)) {
      return res.status(400).json({ error: 'Username must be 3–20 characters, letters and numbers only.' });
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address ending in .com' });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    // Check for duplicate email only — usernames do not need to be unique
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'An account with that email already exists.' });
    }

    // Create user (password hashing handled by pre-save hook in User model)
    const user = new User({ username, email, password });
    await user.save();

    req.session.userId = user._id;
    console.log(`[Register] Success — user saved: { username: '${user.username}', email: '${user.email}', _id: '${user._id}' }`);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// POST /auth/login — Authenticate an existing user
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // --- Streak logic ---
    const now = new Date();
    const lastActive = user.streak.lastActive;

    if (lastActive) {
      const hoursSinceLast = (now - lastActive) / (1000 * 60 * 60);

      if (hoursSinceLast >= 24 && hoursSinceLast <= 48) {
        user.streak.current += 1;
      } else if (hoursSinceLast > 48) {
        user.streak.current = 1;
      }
      // If less than 24 hours, no change (same day login)
    } else {
      user.streak.current = 1;
    }

    user.streak.lastActive = now;
    await user.save();

    req.session.userId = user._id;
    res.json({ success: true, user: { username: user.username, points: user.points } });
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
