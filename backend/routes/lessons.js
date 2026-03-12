const express = require("express");
const router = express.Router();
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");
const User = require("../models/User");
const { requireAuth } = require("../middleware/authMiddleware");
const { awardPoints } = require("../utils/rewards");

const getLessonActivityMetadata = async (lesson) => {
  const module = await Module.findOne({ moduleId: lesson.moduleId })
    .select("moduleId title")
    .lean();

  return {
    lessonId: lesson.lessonId,
    lessonName: lesson.title,
    moduleId: lesson.moduleId,
    moduleName: module?.title || null,
  };
};

// GET /lessons — Return all modules sorted by order with user progress
router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    const modules = await Module.find().sort({ order: 1 }).lean();
    const totalLessons = await Lesson.countDocuments();
    const completedCount = user.completedLessons
      ? user.completedLessons.length
      : 0;

    const progressPercent = Math.round(
      totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0,
    );

    res.json({
      success: true,
      modules,
      completedLessons: user.completedLessons || [],
      totalLessons,
      progressPercent,
    });
  } catch (err) {
    console.error("Get lessons failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /lessons/:lessonId — Return lesson content and update user's currentLesson
router.get("/:lessonId", requireAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findOne({
      lessonId: req.params.lessonId,
    }).lean();
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    // Track which lesson the user is currently viewing
    await User.findByIdAndUpdate(req.session.userId, {
      currentLesson: req.params.lessonId,
    });

    res.json(lesson);
  } catch (err) {
    console.error("Get lesson failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST /lessons/:lessonId/complete — Mark lesson complete and award points
router.post("/:lessonId/complete", requireAuth, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!Array.isArray(user.completedLessons)) user.completedLessons = [];
    if (!Array.isArray(user.activityLog)) user.activityLog = [];
    if (typeof user.totalPoints !== "number") user.totalPoints = 0;

    // Avoid duplicate completion
    if ((user.completedLessons || []).includes(lessonId)) {
      const totalLessons = await Lesson.countDocuments();
      const completedCount = user.completedLessons
        ? user.completedLessons.length
        : 0;

      return res.json({
        success: true,
        alreadyCompleted: true,
        totalPoints: user.totalPoints || 0,
        completedLessons: completedCount,
        totalLessons,
        progress: totalLessons > 0 ? completedCount / totalLessons : 0,
      });
    }

    const lesson = await Lesson.findOne({ lessonId });
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const activityMetadata = await getLessonActivityMetadata(lesson);

    user.completedLessons.push(lessonId);

    const totalLessons = await Lesson.countDocuments();

    // Completing a lesson always awards +200 points
    await awardPoints(user, 200, "lesson_complete", activityMetadata);

    // Check if all lessons are now complete
    if (totalLessons > 0 && user.completedLessons.length >= totalLessons) {
      user.allLessonsComplete = true;
      await user.save();
    }

    const completedCount = user.completedLessons.length;
    const progress = totalLessons > 0 ? completedCount / totalLessons : 0;

    res.json({
      success: true,
      totalPoints: user.totalPoints,
      completedLessons: completedCount,
      totalLessons,
      progress,
      progressPercent: Math.round(progress * 100),
      allLessonsComplete: user.allLessonsComplete,
    });
  } catch (err) {
    console.error("Complete lesson failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST /lessons/:lessonId/quiz/complete — Mark quiz complete and award points
router.post("/:lessonId/quiz/complete", requireAuth, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!Array.isArray(user.completedQuizzes)) user.completedQuizzes = [];
    if (!Array.isArray(user.activityLog)) user.activityLog = [];
    if (typeof user.totalPoints !== "number") user.totalPoints = 0;

    const lesson = await Lesson.findOne({ lessonId }).lean();
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    if (!lesson.quiz) {
      return res
        .status(400)
        .json({ error: "Quiz not available for this lesson" });
    }

    const activityMetadata = await getLessonActivityMetadata(lesson);

    if ((user.completedQuizzes || []).includes(lessonId)) {
      return res.json({
        success: true,
        alreadyCompleted: true,
        totalPoints: user.totalPoints || 0,
      });
    }

    user.completedQuizzes.push(lessonId);

    // Completing a quiz always awards +5 points
    await awardPoints(user, 5, "quiz_complete", activityMetadata);

    res.json({
      success: true,
      totalPoints: user.totalPoints,
      quizCompleted: true,
    });
  } catch (err) {
    console.error("Complete quiz failed:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
