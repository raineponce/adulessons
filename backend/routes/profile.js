const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Module = require('../models/Module');
const { requireAuth } = require('../middleware/authMiddleware');
const { sanitizeInput } = require('../utils/validators');

// Predefined set of allowed avatar options
const ALLOWED_AVATARS = ['default', 'avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5'];

// GET /profile — Return user profile info
router.get('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .select('username email avatar points streak completedLessons currentLesson')
      .lean();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /profile/avatar — Update the user's avatar
router.put('/avatar', requireAuth, async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!ALLOWED_AVATARS.includes(avatar)) {
      return res.status(400).json({ error: 'Invalid avatar selection' });
    }

    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { avatar },
      { new: true }
    ).select('avatar');

    res.json({ avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /profile/address — Update the user's shipping address (for final prize)
router.put('/address', requireAuth, async (req, res) => {
  try {
    const { name, street, city, state, zip } = req.body;
    const sanitized = {
      name: sanitizeInput(name),
      street: sanitizeInput(street),
      city: sanitizeInput(city),
      state: sanitizeInput(state),
      zip: sanitizeInput(zip)
    };

    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { shippingAddress: sanitized },
      { new: true }
    ).select('shippingAddress');

    res.json({ shippingAddress: user.shippingAddress });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /profile/user — Update display name, email, and optionally password
router.put('/user', requireAuth, async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword, confirmPassword } = req.body;

    const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.com$/i;

    if (!username || !USERNAME_REGEX.test(username)) {
      return res.status(400).json({ error: 'Username must be 3–20 characters, letters and numbers only.' });
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address ending in .com' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    // Check if email is taken by another account
    if (email.toLowerCase() !== user.email) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) return res.status(400).json({ error: 'An account with that email already exists.' });
    }

    user.username = username;
    user.email = email.toLowerCase();

    // Only update password if any password field was provided
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required.' });
      }
      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ error: 'New password must be at least 8 characters.' });
      }
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'New passwords do not match.' });
      }

      const match = await user.comparePassword(currentPassword);
      if (!match) {
        return res.status(400).json({ error: 'Current password is incorrect.' });
      }

      user.password = newPassword;
    }

    await user.save();

    console.log(`[Profile] User updated: { username: '${user.username}', email: '${user.email}', _id: '${user._id}' }`);
    res.json({ success: true, username: user.username, email: user.email });
  } catch (err) {
    console.error('Profile update error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /profile/progress — Return detailed progress information
router.get('/progress', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .select('completedLessons allLessonsComplete points')
      .lean();

    const modules = await Module.find().sort({ order: 1 }).lean();

    // Calculate per-module completion
    const moduleProgress = modules.map(mod => {
      const completedInModule = (user.completedLessons || []).filter(id =>
        mod.lessonIds.includes(id)
      ).length;

      return {
        moduleId: mod.moduleId,
        title: mod.title,
        totalLessons: mod.lessonIds.length,
        completedLessons: completedInModule,
        percentComplete: mod.lessonIds.length > 0
          ? Math.round((completedInModule / mod.lessonIds.length) * 100)
          : 0
      };
    });

    const totalLessons = modules.reduce((sum, m) => sum + m.lessonIds.length, 0);
    const completedCount = user.completedLessons ? user.completedLessons.length : 0;
    const overallPercent = totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

    res.json({
      moduleProgress,
      overallPercent,
      allLessonsComplete: user.allLessonsComplete
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
