const express = require('express');
const router = express.Router();
const SecretCode = require('../models/SecretCode');
const User = require('../models/User');
const { requireAuth } = require('../middleware/authMiddleware');

// POST /codes/redeem — Validate and redeem a secret code
router.post('/redeem', requireAuth, async (req, res) => {
  try {
    const { code } = req.body || {};
    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const normalizedCode = code.trim().toUpperCase();
    const secretCode = await SecretCode.findOne({ code: normalizedCode });

    // Validate the code exists, is active, and has not expired
    if (!secretCode || !secretCode.active) {
      return res.status(404).json({ error: 'Invalid or inactive code' });
    }

    if (secretCode.expiresAt && secretCode.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Code has expired' });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: 'User session invalid' });
    }

    // Ensure the user has not already used this code
    if (user.usedCodes.includes(secretCode.code)) {
      return res.status(400).json({ error: 'Code already redeemed' });
    }

    // Award points or prize based on rewardType
    if (secretCode.rewardType === 'points') {
      user.points += secretCode.pointsValue;
    } else if (secretCode.rewardType === 'prize') {
      user.redeemedPrizes.push({
        prizeId: secretCode.prizeId,
        redeemedAt: new Date()
      });
    }

    user.usedCodes.push(secretCode.code);
    await user.save();

    res.json({
      success: true,
      rewardType: secretCode.rewardType,
      pointsValue: secretCode.rewardType === 'points' ? secretCode.pointsValue : 0,
      points: user.points
    });
  } catch (err) {
    console.error('Code redemption error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;