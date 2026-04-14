// Script to seed the database with module and lesson content from /content JSON files
require('dotenv').config();

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');

const CONTENT_DIR = path.join(__dirname, '../../content');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existingModules = await Module.countDocuments();
    const existingLessons = await Lesson.countDocuments();

    if (existingModules > 0 || existingLessons > 0) {
      console.log('Modules or lessons already exist, skipping content seed');
      return;
    }

    // Read all JSON files from the /content directory
    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(CONTENT_DIR, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      console.log(`Seeding ${file}...`);

      // Extract lessons from the module data
      const { lessons, ...moduleData } = data;
      const lessonIds = (lessons || []).map(l => l.lessonId);

      // Create the Module document
      await Module.create({ ...moduleData, lessonIds });
      console.log(`  Created module: ${moduleData.moduleId}`);

      // Create individual Lesson documents
      for (const lesson of (lessons || [])) {
        await Lesson.create(lesson);
        console.log(`  Created lesson: ${lesson.lessonId}`);
      }
    }

    console.log('Content seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seed();
