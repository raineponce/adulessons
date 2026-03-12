const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/User");

const DEMO_USER = {
  username: "Demo19",
  email: "demo19@adulessons.test",
  password: "DemoPass19!",
};

const LESSONS = ["mod1-lesson1", "mod1-lesson2", "mod1-lesson3"];

const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const daysAgo = (n) => {
  const d = normalizeDate(new Date());
  d.setDate(d.getDate() - n);
  return d;
};

const seedDemoProgressUser = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  let user = await User.findOne({ email: DEMO_USER.email });

  if (!user) {
    const hashed = await bcrypt.hash(DEMO_USER.password, 10);
    user = await User.create({
      username: DEMO_USER.username,
      email: DEMO_USER.email,
      password: hashed,
    });
    console.log("Created demo user:", DEMO_USER.email);
  } else {
    console.log("Updating existing demo user:", DEMO_USER.email);
  }

  user.username = DEMO_USER.username;
  user.completedLessons = LESSONS;
  user.completedQuizzes = ["mod1-lesson1"];
  user.currentLesson = "mod1-lesson4";

  user.currentStreak = 19;
  user.longestStreak = Math.max(user.longestStreak || 0, 19);
  user.lastLoginDate = normalizeDate(new Date());

  user.totalPoints = 605;
  user.allLessonsComplete = false;
  user.finalPrizeClaimed = false;

  user.activityLog = [
    { type: "lesson_complete", points: 200, createdAt: daysAgo(2) },
    { type: "quiz_complete", points: 5, createdAt: daysAgo(1) },
    {
      type: "streak_continue",
      points: 5,
      createdAt: normalizeDate(new Date()),
    },
  ];

  await user.save();

  console.log("Demo progress seeded successfully.");
  console.log("Login email:", DEMO_USER.email);
  console.log("Login password:", DEMO_USER.password);
};

seedDemoProgressUser()
  .catch((err) => {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
