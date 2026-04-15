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

// GET /profile/preferences — Return user preferences
router.get('/preferences', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .select('preferences')
      .lean();

    res.json(user.preferences || { fontSize: 100 });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /profile/preferences — Update user preferences
router.put('/preferences', requireAuth, async (req, res) => {
  try {
    const { fontSize, darkMode } = req.body;
    const update = {};

    if (fontSize !== undefined) {
      if (typeof fontSize !== 'number' || fontSize < 75 || fontSize > 150) {
        return res.status(400).json({ error: 'fontSize must be a number between 75 and 150' });
      }
      update['preferences.fontSize'] = fontSize;
    }

    if (darkMode !== undefined) {
      if (typeof darkMode !== 'boolean') {
        return res.status(400).json({ error: 'darkMode must be a boolean' });
      }
      update['preferences.darkMode'] = darkMode;
    }

    const user = await User.findByIdAndUpdate(
      req.session.userId,
      update,
      { new: true }
    ).select('preferences');

    res.json(user.preferences);
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
