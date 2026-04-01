// Script to seed redeemable secret codes for testing Prize Shop
require('dotenv').config();

const mongoose = require('mongoose');
const SecretCode = require('../models/SecretCode');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define test secret codes
    const testCodes = [
      {
        code: 'E2EPOINTS50',
        rewardType: 'points',
        pointsValue: 50,
        active: true,
        expiresAt: null
      },
      {
        code: 'E2EPOINTS100',
        rewardType: 'points',
        pointsValue: 100,
        active: true,
        expiresAt: null
      },
      {
        code: 'E2EPOINTS200',
        rewardType: 'points',
        pointsValue: 200,
        active: true,
        expiresAt: null
      },
      {
        code: 'TESTCODE1',
        rewardType: 'points',
        pointsValue: 75,
        active: true,
        expiresAt: null
      },
      {
        code: 'W15E',
        rewardType: 'points',
        pointsValue: 150,
        active: true,
        expiresAt: null
      }
    ];

    console.log('Upserting secret codes...');
    for (const codeData of testCodes) {
      const result = await SecretCode.updateOne(
        { code: codeData.code },
        codeData,
        { upsert: true }
      );
      const action = result.upsertedId ? 'Created' : 'Updated';
      console.log(`  ${action} code: ${codeData.code} (+${codeData.pointsValue} points)`);
    }

    console.log('Secret code seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seed();