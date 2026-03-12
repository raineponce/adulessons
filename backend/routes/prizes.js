const express = require('express');
const router = express.Router();
const Prize = require('../models/Prize');
const User = require('../models/User');
const { requireAuth } = require('../middleware/authMiddleware');

// GET /prizes — Return all available prizes with unlock state for the current user
router.get('/', requireAuth, async (req, res) => {
  try {
    const prizes = await Prize.find({ available: true }).lean();

    const user = await User.findById(req.session.userId)
      .select('totalPoints')
      .lean();

    if (!user) {
      return res.status(401).json({ error: 'User session invalid' });
    }

    const pointsBalance = typeof user.totalPoints === 'number' ? user.totalPoints : 0;

    // Attach unlocked boolean to each prize based on points only
    const prizesWithUnlock = prizes.map(prize => ({
      ...prize,
      unlocked: pointsBalance >= prize.cost
    }));

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

    // protects old accounts that still have points in the database.
    if (typeof user.totalPoints !== 'number') {
      user.totalPoints = user.totalPoints || 0;
    }

    if (user.totalPoints < prize.cost) {
      return res.status(400).json({ error: 'Not enough points' });
    }

    // Deduct points and record redemption
    user.totalPoints -= prize.cost;
    user.redeemedPrizes.push({ prizeId: prize._id, redeemedAt: new Date() });
    await user.save();

    res.json({
      success: true,
      points: user.totalPoints,
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