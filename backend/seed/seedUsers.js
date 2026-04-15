// Script to seed fake test users into the database
require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');

const fakeUsers = [
  {
    username: 'zoey123',
    email: 'zoey@test.com',
    password: 'password123',
    avatar: 'cat',
    points: 50,
    streak: { current: 3, lastActive: new Date(Date.now() - 1000 * 60 * 60 * 25) }, // 25 hrs ago
    completedLessons: ['mod1-lesson1', 'mod1-lesson2', 'mod1-lesson3', 'mod2-lesson1', 'mod2-lesson2'],
    currentLesson: 'mod2-lesson3',
    allLessonsComplete: false
  },
  {
    username: 'testuser',
    email: 'test@test.com',
    password: 'password123',
    avatar: 'robot',
    points: 0,
    streak: { current: 0, lastActive: null },
    completedLessons: [],
    currentLesson: null,
    allLessonsComplete: false
  },
  {
    username: 'superlearner',
    email: 'super@test.com',
    password: 'password123',
    avatar: 'star',
    points: 220,
    streak: { current: 15, lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5) }, // 5 hrs ago
    completedLessons: Array.from({ length: 22 }, (_, i) => {
      const mod = Math.floor(i / 4) + 1;
      const lesson = (i % 4) + 1;
      return `mod${mod}-lesson${lesson}`;
    }),
    currentLesson: null,
    allLessonsComplete: true
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    console.log('Cleared existing users');

    for (const userData of fakeUsers) {
      const user = new User(userData);
      await user.save(); // triggers the pre-save bcrypt hook to hash passwords
      console.log(`  Created user: ${user.username} (${user.email})`);
    }

    console.log('User seeding complete!');
  } catch (err) {
    console.error('User seeding error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seed();
