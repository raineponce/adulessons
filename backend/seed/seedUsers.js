const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');

async function seedUsers() {
  await mongoose.connect(process.env.MONGODB_URI);

  const users = [
    { email: 'test1@adulessons.test', password: 'TestPass1!', username: 'Zoey' },
    { email: 'test2@adulessons.test', password: 'TestPass2!', username: 'Alex' },
  ];

  for (const u of users) {
    const existing = await User.findOne({ email: u.email });

    if (!existing) {
      // Store plaintext here; User model pre-save hook hashes once.
      await User.create({ ...u });
      console.log(`Created user: ${u.email}`);
      continue;
    }

    // Repair/update existing seeded users so reruns are deterministic.
    existing.username = u.username;
    existing.password = u.password;
    await existing.save();
    console.log(`Updated user password/profile: ${u.email}`);
  }

  await mongoose.disconnect();
  console.log('Done.');
}

seedUsers().catch(console.error);
