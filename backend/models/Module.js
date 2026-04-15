const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  moduleId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  // introPage and summaryPage hold arrays of content blocks (flexible structure)
  introPage: { type: mongoose.Schema.Types.Mixed },
  summaryPage: { type: mongoose.Schema.Types.Mixed },
  // Ordered list of lessonId strings belonging to this module
  lessonIds: [{ type: String }]
});

module.exports = mongoose.model('Module', moduleSchema);
