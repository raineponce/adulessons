const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const User = require("../models/User");

const DASHBOARD_URL = "/account/dashboard.html";

// Limit login/register to 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 10 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts, please try again later." },
});

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDayDifference(currentDate, previousDate) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.round(
    (startOfLocalDay(currentDate) - startOfLocalDay(previousDate)) / MS_PER_DAY,
  );
}

// POST /auth/register — Create a new user account
router.post("/register", authLimiter, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create user (password hashing handled by pre-save hook in User model)
    const user = new User({ username, email, password });
    await user.save();

    // Set session; return JSON for API clients, redirect for browser form posts
    req.session.userId = user._id;
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json({
        success: true,
        user: { username: user.username, points: user.points },
      });
    }
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

    // --- Streak logic (calendar day-based) ---
    // Streak points are only awarded on a new calendar day, never on first login day.
    const DAILY_STREAK_POINTS = 5;
    const now = new Date();
    const lastActive = user.streak.lastActive
      ? new Date(user.streak.lastActive)
      : null;

    if (lastActive) {
      const dayDifference = getDayDifference(now, lastActive);

      if (dayDifference === 1) {
        // Exactly one calendar day apart: continue streak and award points.
        user.streak.current += 1;
        user.points += DAILY_STREAK_POINTS;
      } else if (dayDifference > 1) {
        // Missed one or more days: reset to day 1 and award points for today.
        user.streak.current = 1;
        user.points += DAILY_STREAK_POINTS;
      }
      // If dayDifference === 0, this is a same-day login; no streak change or points.
    } else {
      // First login baseline: no streak points on account-creation day.
      user.streak.current = 0;
    }

    user.streak.lastActive = now;
    await user.save();

    // Set session; return JSON for API clients, redirect for browser form posts
    req.session.userId = user._id;
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json({
        success: true,
        user: { username: user.username, points: user.points },
      });
    }
    res.redirect(DASHBOARD_URL);
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /auth/logout — Destroy session and redirect home
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json({ success: true });
    }
    res.redirect("/");
  });
});

// GET /auth/me — Return current user info or { loggedIn: false }
router.get("/me", authLimiter, async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.json({ loggedIn: false });
    }
    const user = await User.findById(req.session.userId)
      .select("username email avatar points streak")
      .lean();
    if (!user) {
      return res.json({ loggedIn: false });
    }
    res.json({ loggedIn: true, user });
  } catch (err) {
    console.error("Auth me error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
