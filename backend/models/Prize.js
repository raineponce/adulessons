const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  // 'coupon' prizes provide a coupon code; 'printable' prizes provide a downloadable file
  type: { type: String, enum: ['coupon', 'printable'], required: true },
  cost: { type: Number, required: true }, // points cost to redeem
  fileUrl: String,
  couponCode: String,
  available: { type: Boolean, default: true },
  // Optional: moduleId (e.g. 'mod1') that must be 100% complete to unlock this printable
  requiredModuleId: { type: String, default: null }
});

module.exports = mongoose.model('Prize', prizeSchema);
