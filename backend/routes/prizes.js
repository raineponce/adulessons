const express = require("express");
const router = express.Router();
const Prize = require("../models/Prize");
const User = require("../models/User");
const { requireAuth } = require("../middleware/authMiddleware");

// GET /prizes — Return all available prizes
router.get("/", requireAuth, async (req, res) => {
  try {
    const prizes = await Prize.find({ available: true }).lean();
    res.json(prizes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /prizes/:prizeId/redeem — Redeem a prize using points
router.post("/:prizeId/redeem", requireAuth, async (req, res) => {
  try {
    const prize = await Prize.findById(req.params.prizeId);
    if (!prize || !prize.available) {
      return res.status(404).json({ error: "Prize not found or unavailable" });
    }

    const now = new Date();
    const user = await User.findOneAndUpdate(
      {
        _id: req.session.userId,
        points: { $gte: prize.cost },
        redeemedPrizes: { $not: { $elemMatch: { prizeId: prize._id } } },
      },
      {
        $inc: { points: -prize.cost },
        $push: { redeemedPrizes: { prizeId: prize._id, redeemedAt: now } },
      },
      { new: true },
    );

    if (!user) {
      const currentUser = await User.findById(req.session.userId)
        .select("points redeemedPrizes")
        .lean();

      if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const alreadyRedeemed = Array.isArray(currentUser.redeemedPrizes)
        ? currentUser.redeemedPrizes.some(
            (entry) =>
              entry &&
              entry.prizeId &&
              String(entry.prizeId) === String(prize._id),
          )
        : false;

      if (alreadyRedeemed) {
        return res.status(400).json({ error: "Prize already redeemed" });
      }

      if (Number(currentUser.points || 0) < prize.cost) {
        return res.status(400).json({ error: "Not enough points" });
      }

      return res.status(409).json({ error: "Could not redeem prize" });
    }

    res.json({
      message: "Prize redeemed successfully",
      points: user.points,
      prize: {
        name: prize.name,
        type: prize.type,
        fileUrl: prize.fileUrl,
        couponCode: prize.couponCode,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /prizes/redeemed — Return the user's redeemed prizes
router.get("/redeemed", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .populate("redeemedPrizes.prizeId")
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.redeemedPrizes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
