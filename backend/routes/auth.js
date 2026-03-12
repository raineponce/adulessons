const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const User = require("../models/User");
const { awardPoints } = require("../utils/rewards");

const DASHBOARD_URL = "/account/dashboard.html";
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

// Limit login/register to 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts, please try again later." },
});

// POST /auth/register — Create a new user account
router.post("/register", authLimiter, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create user (password hashing handled by pre-save hook in User model)
    const user = new User({ username, email, password });
    await user.save();

    // Set session and redirect to dashboard
    req.session.userId = user._id;
    res.redirect(DASHBOARD_URL);
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// POST /auth/login — Authenticate an existing user
router.post("/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (typeof user.totalPoints !== "number") user.totalPoints = 0;
    if (typeof user.currentStreak !== "number") user.currentStreak = 0;
    if (!Array.isArray(user.activityLog)) user.activityLog = [];

    // --- Daily streak logic (runs at most once per day) ---
    const today = normalizeDate(new Date());
    const lastLoginDate = user.lastLoginDate
      ? normalizeDate(user.lastLoginDate)
      : null;

    if (!lastLoginDate) {
      user.currentStreak = 1;
      user.longestStreak = Math.max(
        user.longestStreak || 0,
        user.currentStreak,
      );
      user.lastLoginDate = today;
      await user.save();
    } else {
      const diffDays = Math.floor((today - lastLoginDate) / MS_PER_DAY);

      if (diffDays === 0) {
        // Already logged in today: no streak increment, no points.
      } else if (diffDays === 1) {
        user.currentStreak = (user.currentStreak || 0) + 1;
        user.longestStreak = Math.max(
          user.longestStreak || 0,
          user.currentStreak,
        );
        user.lastLoginDate = today;

        // Continuing streak awards +5 points and logs activity.
        await awardPoints(user, 5, "streak_continue");
      } else {
        user.currentStreak = 1;
        user.longestStreak = Math.max(
          user.longestStreak || 0,
          user.currentStreak,
        );
        user.lastLoginDate = today;
        await user.save();
      }
    }

    // Set session and redirect to dashboard
    req.session.userId = user._id;
    res.redirect(DASHBOARD_URL);
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /auth/logout — Destroy session and redirect home
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
