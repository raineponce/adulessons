const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'default'
  },
  points: {
    type: Number,
    default: 0
  },
  streak: {
    current: { type: Number, default: 0 },
    lastActive: { type: Date }
  },
  // Array of lessonId strings the user has completed, e.g. 'mod1-lesson1'
  completedLessons: [{ type: String }],
  currentLesson: {
    type: String,
    default: null
  },
  redeemedPrizes: [
    {
      prizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prize' },
      redeemedAt: { type: Date, default: Date.now }
    }
  ],
  allLessonsComplete: {
    type: Boolean,
    default: false
  },
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String
  },
  finalPrizeClaimed: {
    type: Boolean,
    default: false
  },
  usedCodes: [{ type: String }]
}, { timestamps: true });

// Hash password before saving if it has been modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare a plaintext password with the stored hash
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
