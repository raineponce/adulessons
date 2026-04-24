const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const { requireAuth } = require('../middleware/authMiddleware');

// Total number of lessons across all modules.
// TODO: Update this to the actual lesson count once all content is loaded.
const TOTAL_LESSONS = 22; // Approximate: 6 modules × ~3.5 lessons average

// GET /lessons/modules/:moduleId — Return a single module's content
router.get('/modules/:moduleId', requireAuth, async (req, res) => {
  try {
    const module = await Module.findOne({ moduleId: req.params.moduleId })
      .select('moduleId title description order lessonIds')
      .lean();
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.json(module);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /lessons — Return all modules sorted by order with user progress
router.get('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).lean();
    const modules = await Module.find().sort({ order: 1 }).lean();

    const progressPercent = Math.round(
      ((user.completedLessons.length) / TOTAL_LESSONS) * 100
    );

    res.json({
      modules,
      completedLessons: user.completedLessons,
      progressPercent
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /lessons/:lessonId — Return lesson content and update user's currentLesson
router.get('/:lessonId', requireAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ lessonId: req.params.lessonId }).lean();
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Track which lesson the user is currently viewing
    await User.findByIdAndUpdate(req.session.userId, {
      currentLesson: req.params.lessonId
    });

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /lessons/:lessonId/complete — Mark lesson complete and award points
router.post('/:lessonId/complete', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);

    // Avoid duplicate completion
    if (user.completedLessons.includes(req.params.lessonId)) {
      return res.json({ alreadyCompleted: true, points: user.points });
    }

    const lesson = await Lesson.findOne({ lessonId: req.params.lessonId });
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    user.completedLessons.push(req.params.lessonId);
    user.points += lesson.pointsAwarded;

    // Check if all lessons are now complete
    if (user.completedLessons.length >= TOTAL_LESSONS) {
      user.allLessonsComplete = true;
    }

    await user.save();

    const progressPercent = Math.round(
      (user.completedLessons.length / TOTAL_LESSONS) * 100
    );

    res.json({
      points: user.points,
      progressPercent,
      allLessonsComplete: user.allLessonsComplete
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
