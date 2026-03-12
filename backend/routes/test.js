const express = require('express');
const router = express.Router();
const User = require('../models/User');
const SecretCode = require('../models/SecretCode');

// GET /test/users — List all users (test only, no auth required)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .lean();
    res.json({ success: true, users });
  } catch (err) {
    console.error('Test users error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /test/add-points — Add points to the logged-in user
router.post('/add-points', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Login required' });
    }
    const { points } = req.body;
    if (typeof points !== 'number' || points < 0) {
      return res.status(400).json({ error: 'Invalid points value' });
    }
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.points += points;
    await user.save();

    res.json({ success: true, username: user.username, points: user.points });
  } catch (err) {
    console.error('Add points error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /test/change-avatar — Change avatar for the logged-in user
router.post('/change-avatar', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Login required' });
    }
    const { avatar } = req.body;
    const allowed = ['default', 'cat', 'dog', 'robot', 'star', 'rocket', 'book', 'globe'];
    if (!allowed.includes(avatar)) {
      return res.status(400).json({ error: `Avatar must be one of: ${allowed.join(', ')}` });
    }
    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { avatar },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ success: true, username: user.username, avatar: user.avatar });
  } catch (err) {
    console.error('Change avatar error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /test/secret-codes — List all secret codes (test only, no auth required)
router.get('/secret-codes', async (req, res) => {
  try {
    const secretCodes = await SecretCode.find()
      .select('code rewardType pointsValue active expiresAt prizeId')
      .sort({ code: 1 })
      .lean();

    res.json({ success: true, secretCodes });
  } catch (err) {
    console.error('Test secret codes error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
