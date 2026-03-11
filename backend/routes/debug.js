// TEMPORARY DEBUG ROUTES — remove before production
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Module = require('../models/Module');

// View all users (no passwords)
router.get('/users', async (req, res) => {
  const users = await User.find().select('-password').lean();
  res.send('<pre>' + JSON.stringify(users, null, 2) + '</pre>');
});

// View all modules
router.get('/modules', async (req, res) => {
  const modules = await Module.find().lean();
  res.send('<pre>' + JSON.stringify(modules, null, 2) + '</pre>');
});

// View all lessons (just metadata, not full content)
router.get('/lessons', async (req, res) => {
  const lessons = await Lesson.find().select('lessonId moduleId title order pointsAwarded').lean();
  res.send('<pre>' + JSON.stringify(lessons, null, 2) + '</pre>');
});

module.exports = router;