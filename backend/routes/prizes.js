const express = require('express');
const router = express.Router();
const Prize = require('../models/Prize');
const User = require('../models/User');
const { requireAuth } = require('../middleware/authMiddleware');

// GET /prizes — Return all available prizes
router.get('/', requireAuth, async (req, res) => {
  try {
    const prizes = await Prize.find({ available: true }).lean();
    res.json(prizes);
  } catch (err) {
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
    if (user.points < prize.cost) {
      return res.status(400).json({ error: 'Not enough points' });
    }

    // Deduct points and record redemption
    user.points -= prize.cost;
    user.redeemedPrizes.push({ prizeId: prize._id, redeemedAt: new Date() });
    await user.save();

    res.json({
      message: 'Prize redeemed successfully',
      points: user.points,
      prize: {
        name: prize.name,
        type: prize.type,
        fileUrl: prize.fileUrl,
        couponCode: prize.couponCode
      }
    });
  } catch (err) {
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
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
