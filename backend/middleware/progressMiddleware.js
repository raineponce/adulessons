const User = require("../models/User");

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

    req.userProgress = {
      completedLessons: user.completedLessons || [],
      totalPoints: user.totalPoints || 0,
      currentStreak: user.currentStreak || 0,
      currentLesson: user.currentLesson,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { attachProgress };
