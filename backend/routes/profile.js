const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Module = require('../models/Module');
const { requireAuth } = require('../middleware/authMiddleware');
const { sanitizeInput, isValidEmail, isValidUsername } = require('../utils/validators');

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

// PUT /profile — Update the user's display name and email
router.put('/', requireAuth, async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }

    const sanitizedUsername = sanitizeInput(username.trim());
    const sanitizedEmail = sanitizeInput(email.trim().toLowerCase());

    if (!isValidUsername(sanitizedUsername)) {
      return res.status(400).json({ error: 'Username must be 3-20 alphanumeric characters' });
    }

    if (!isValidEmail(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { username: sanitizedUsername, email: sanitizedEmail },
      { new: true, runValidators: true }
    ).select('username email');

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.json({ username: user.username, email: user.email });
  } catch (err) {
    if (err.code === 11000) {
      const field = err.keyPattern && err.keyPattern.email ? 'email' : 'username';
      return res.status(409).json({ error: `That ${field} is already in use` });
    }
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

// PUT /profile/password — Update the user's password
router.put('/password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const match = await user.comparePassword(currentPassword);
    if (!match) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true });
  } catch (err) {
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
