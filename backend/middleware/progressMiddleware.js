const User = require('../models/User');
const Lesson = require('../models/Lesson');

// Middleware that loads the current user from the session and attaches
// progress information to req.userProgress for use in route handlers
const attachProgress = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userId) {
      req.userProgress = null;
      return next();
    }

    const user = await User.findById(req.session.userId).lean();
    if (!user) {
      req.userProgress = null;
      return next();
    }

    // Calculate progress percentage based on total lessons
    const totalLessons = await Lesson.countDocuments();
    const completedCount = user.completedLessons ? user.completedLessons.length : 0;
    const progressPercent = totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

    req.userProgress = {
      completedLessons: user.completedLessons || [],
      progressPercent,
      points: user.points,
      streak: user.streak,
      currentLesson: user.currentLesson
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { attachProgress };
