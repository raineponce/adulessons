const mongoose = require('mongoose');

const secretCodeSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true, uppercase: true },
  // 'points' rewards add points; 'prize' rewards grant a prize
  rewardType: { type: String, enum: ['points', 'prize'], required: true },
  pointsValue: { type: Number, default: 0 },
  prizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prize', default: null },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date, default: null }
});

module.exports = mongoose.model('SecretCode', secretCodeSchema);
