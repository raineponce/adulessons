const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");
const { requireAuth } = require("../middleware/authMiddleware");
const { sanitizeInput } = require("../utils/validators");

// Predefined set of allowed avatar options
const ALLOWED_AVATARS = [
  "default",
  "avatar1",
  "avatar2",
  "avatar3",
  "avatar4",
  "avatar5",
];

const activityLabels = {
  lesson_complete: "Completed a lesson",
  quiz_complete: "Completed a quiz",
  streak_continue: "Continued login streak",
  collectable_claimed: "Claimed collectable reward",
};

const LESSON_ACTIVITY_TYPES = new Set(["lesson_complete", "quiz_complete"]);

// GET /profile — Return user profile info
router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .select(
        "username email avatar totalPoints currentStreak longestStreak completedLessons currentLesson",
      )
      .lean();

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      success: true,
      ...user,
      points: user.totalPoints || 0,
      streak: {
        current: user.currentStreak || 0,
        lastActive: user.lastLoginDate || null,
      },
    });
  } catch (err) {
    console.error("Get profile failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// PUT /profile/avatar — Update the user's avatar
router.put("/avatar", requireAuth, async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      return res.status(400).json({ error: "Avatar is required" });
    }

    if (!ALLOWED_AVATARS.includes(avatar)) {
      return res.status(400).json({ error: "Invalid avatar selection" });
    }

    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { avatar },
      { new: true },
    ).select("avatar");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, avatar: user.avatar });
  } catch (err) {
    console.error("Update avatar failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// PUT /profile/address — Update the user's shipping address (for final prize)
router.put("/address", requireAuth, async (req, res) => {
  try {
    const { name, street, city, state, zip } = req.body;
    if (!name || !street || !city || !state || !zip) {
      return res.status(400).json({ error: "All address fields are required" });
    }

    const sanitized = {
      name: sanitizeInput(name),
      street: sanitizeInput(street),
      city: sanitizeInput(city),
      state: sanitizeInput(state),
      zip: sanitizeInput(zip),
    };

    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { shippingAddress: sanitized },
      { new: true },
    ).select("shippingAddress");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ success: true, shippingAddress: user.shippingAddress });
  } catch (err) {
    console.error("Update address failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /profile/progress — Return detailed progress information
router.get("/progress", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .select(
        "completedLessons currentLesson totalPoints currentStreak longestStreak",
      )
      .lean();

    if (!user) return res.status(404).json({ error: "User not found" });

    const totalLessons = await Lesson.countDocuments();
    const modules = await Module.find().sort({ order: 1 }).lean();

    const completedCount = user.completedLessons
      ? user.completedLessons.length
      : 0;
    const progress = totalLessons > 0 ? completedCount / totalLessons : 0;
    const progressPercent = Math.round(progress * 100);

    const modulesData = modules.map((mod) => ({
      moduleId: mod.moduleId,
      title: mod.title,
      description: mod.description,
      order: mod.order,
      lessonIds: mod.lessonIds,
    }));

    res.json({
      success: true,
      completedLessons: user.completedLessons || [],
      totalLessons,
      progress,
      progressPercent,
      currentLesson: user.currentLesson || null,
      modules: modulesData,
      totalPoints: user.totalPoints || 0,
      currentStreak: user.currentStreak || 0,
      longestStreak: user.longestStreak || 0,

      // Compatibility keys for existing frontend
      points: user.totalPoints || 0,
      streak: {
        current: user.currentStreak || 0,
      },
    });
  } catch (err) {
    console.error("Get progress failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /profile/activity — Return recent activity log
router.get("/activity", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .select("activityLog avatar username")
      .lean();

    if (!user) return res.status(404).json({ error: "User not found" });

    const sortedActivity = (user.activityLog || []).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    // Return only the 3 most recent activities, sorted newest first.
    const activities = sortedActivity.slice(0, 3).map((entry) => ({
      ...entry,
      pointsEarned: entry.points,
      detail: activityLabels[entry.type] || entry.type,
    }));

    // Frontend-ready lesson history for future carousel usage.
    const recentLessons = [];
    const seenLessonIds = new Set();

    for (const entry of sortedActivity) {
      if (!LESSON_ACTIVITY_TYPES.has(entry.type)) continue;
      if (!entry.lessonId || !entry.lessonName) continue;
      if (seenLessonIds.has(entry.lessonId)) continue;

      seenLessonIds.add(entry.lessonId);
      recentLessons.push({
        lessonId: entry.lessonId,
        lessonName: entry.lessonName,
        moduleId: entry.moduleId || null,
        moduleName: entry.moduleName || null,
        lastEventType: entry.type,
        lastEventLabel: activityLabels[entry.type] || entry.type,
        lastEventAt: entry.createdAt,
        pointsEarned: entry.points || 0,
      });

      if (recentLessons.length >= 10) break;
    }

    res.json({
      success: true,
      activities,
      recentLessons,
      avatar: user.avatar,
      username: user.username,
    });
  } catch (err) {
    console.error("Get activity failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /profile/collectable — Return collectable progress (Mr. Wise figurine)
router.get("/collectable", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .select(
        "completedLessons allLessonsComplete finalPrizeClaimed shippingAddress",
      )
      .lean();

    if (!user) return res.status(404).json({ error: "User not found" });

    const totalLessons = await Lesson.countDocuments();
    const completedCount = user.completedLessons
      ? user.completedLessons.length
      : 0;
    const allLessonsComplete =
      totalLessons > 0 && completedCount >= totalLessons;
    const collectablePercent =
      totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    res.json({
      success: true,
      collectablePercent,
      allLessonsComplete,
      finalPrizeClaimed: user.finalPrizeClaimed || false,
      hasAddress: !!(user.shippingAddress && user.shippingAddress.street),
      lessonsRemaining: Math.max(totalLessons - completedCount, 0),
    });
  } catch (err) {
    console.error("Get collectable progress failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST /profile/collectable/claim — Claim the final collectable prize
router.post("/collectable/claim", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const totalLessons = await Lesson.countDocuments();
    const completedCount = user.completedLessons
      ? user.completedLessons.length
      : 0;
    const allLessonsComplete =
      totalLessons > 0 && completedCount >= totalLessons;

    if (!allLessonsComplete) {
      return res.status(400).json({ error: "Complete all lessons first" });
    }

    if (user.finalPrizeClaimed) {
      return res.status(400).json({ error: "Prize already claimed" });
    }

    if (!user.shippingAddress || !user.shippingAddress.street) {
      return res.status(400).json({ error: "Shipping address required" });
    }

    user.finalPrizeClaimed = true;

    // Log the activity
    user.activityLog.push({
      type: "collectable_claimed",
      points: 0,
      createdAt: new Date(),
    });

    await user.save();

    res.json({ success: true, finalPrizeClaimed: true });
  } catch (err) {
    console.error("Claim collectable failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
