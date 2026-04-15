const mongoose = require('mongoose');

// Sub-schema for a single content block on a lesson page
const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'heading', 'image', 'video', 'list', 'link', 'callout'],
    required: true
  },
  // Used by: text, heading, callout
  body: String,
  // Used by: image
  src: String,
  alt: String,
  // Used by: video (YouTube video ID)
  videoId: String,
  // Used by: list
  items: [String],
  ordered: { type: Boolean, default: false },
  // Used by: link
  href: String,
  linkText: String
}, { _id: false });

// Sub-schema for a quiz question
const quizQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctIndex: Number,
  explanation: String
}, { _id: false });

const lessonSchema = new mongoose.Schema({
  lessonId: { type: String, unique: true, required: true },
  moduleId: { type: String, required: true },
  title: { type: String, required: true },
  order: { type: Number, required: true },
  // Each page has a pageNumber and an array of content blocks
  pages: [
    {
      pageNumber: Number,
      blocks: [contentBlockSchema]
    }
  ],
  quiz: quizQuestionSchema,
  pointsAwarded: { type: Number, default: 10 }
});

module.exports = mongoose.model('Lesson', lessonSchema);
