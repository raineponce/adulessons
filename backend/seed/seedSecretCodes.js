// Script to seed secret redemption codes into the database
require('dotenv').config();

const mongoose = require('mongoose');
const SecretCode = require('../models/SecretCode');

const secretCodes = [
  {
    code: 'W15E',
    rewardType: 'points',
    pointsValue: 15,
    active: true
  },
  {
    code: 'R2AD',
    rewardType: 'points',
    pointsValue: 20,
    active: true
  },
  {
    code: 'M8XP',
    rewardType: 'points',
    pointsValue: 25,
    active: true
  },
  {
    code: 'L4RN',
    rewardType: 'points',
    pointsValue: 30,
    active: true
  },
  {
    code: 'B0LT',
    rewardType: 'points',
    pointsValue: 10,
    active: true
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existingCodes = await SecretCode.countDocuments();
    if (existingCodes > 0) {
      console.log('Secret codes already exist, skipping secret code seed');
      return;
    }

    const created = await SecretCode.insertMany(secretCodes);
    console.log(`Created ${created.length} secret codes`);

    console.log('Secret code seeding complete!');
  } catch (err) {
    console.error('Secret code seeding error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seed();
