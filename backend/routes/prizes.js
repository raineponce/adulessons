const express = require('express');
const router = express.Router();
const Prize = require('../models/Prize');
const User = require('../models/User');
const Module = require('../models/Module');
const { requireAuth } = require('../middleware/authMiddleware');

// GET /prizes — Return all available prizes with unlock state for the current user
router.get('/', requireAuth, async (req, res) => {
  try {
    const prizes = await Prize.find({ available: true }).lean();

    // Only compute module completion if any prize requires it
    const moduleIds = [...new Set(
      prizes
        .filter(p => p.type === 'printable' && p.requiredModuleId)
        .map(p => p.requiredModuleId)
    )];

    // Build a set of fully completed moduleIds for this user
    const completedModuleIds = new Set();

    if (moduleIds.length > 0) {
      const user = await User.findById(req.session.userId)
        .select('completedLessons')
        .lean();

      if (!user) {
        return res.status(401).json({ error: 'User session invalid' });
      }

      const modules = await Module.find({ moduleId: { $in: moduleIds } })
        .select('moduleId lessonIds')
        .lean();

      for (const mod of modules) {
        const allComplete = mod.lessonIds.length > 0 &&
          mod.lessonIds.every(id => (user.completedLessons || []).includes(id));
        if (allComplete) {
          completedModuleIds.add(mod.moduleId);
        }
      }
    }

    // Attach unlocked boolean to each prize
    const prizesWithUnlock = prizes.map(prize => {
      let unlocked = true;
      if (prize.type === 'printable' && prize.requiredModuleId) {
        unlocked = completedModuleIds.has(prize.requiredModuleId);
      }
      return { ...prize, unlocked };
    });

    res.json(prizesWithUnlock);
  } catch (err) {
    console.error('GET /prizes error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /prizes/:prizeId/redeem — Redeem a prize using points
router.post('/:prizeId/redeem', requireAuth, async (req, res) => {
  try {
    const prize = await Prize.findById(req.params.prizeId);
    if (!prize || !prize.available) {
      return res.status(404).json({ error: 'Prize not found or unavailable' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: 'User session invalid' });
    }

    // Enforce lock: printables with a required module must be unlocked first
    if (prize.type === 'printable' && prize.requiredModuleId) {
      const mod = await Module.findOne({ moduleId: prize.requiredModuleId })
        .select('lessonIds')
        .lean();

      const isUnlocked = mod &&
        mod.lessonIds.length > 0 &&
        mod.lessonIds.every(id => (user.completedLessons || []).includes(id));

      if (!isUnlocked) {
        return res.status(400).json({ error: 'Prize is locked' });
      }
    }

    if (user.points < prize.cost) {
      return res.status(400).json({ error: 'Not enough points' });
    }

    // Deduct points and record redemption
    user.points -= prize.cost;
    user.redeemedPrizes.push({ prizeId: prize._id, redeemedAt: new Date() });
    await user.save();

    res.json({
      success: true,
      points: user.points,
      prize: {
        name: prize.name,
        type: prize.type,
        fileUrl: prize.fileUrl,
        couponCode: prize.couponCode
      }
    });
  } catch (err) {
    console.error('POST /prizes/:prizeId/redeem error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /prizes/redeemed — Return the user's redeemed prizes
router.get('/redeemed', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .populate('redeemedPrizes.prizeId')
      .lean();

    res.json(user.redeemedPrizes);
  } catch (err) {
    console.error('GET /prizes/redeemed error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;