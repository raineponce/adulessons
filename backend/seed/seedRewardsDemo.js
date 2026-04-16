require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");
const Prize = require("../models/Prize");
const SecretCode = require("../models/SecretCode");

const fakePrizes = [
  {
    name: "$10 Walmart Coupon",
    description: "Redeemable coupon for Walmart purchases.",
    type: "coupon",
    cost: 25,
    couponCode: "WALMART10",
    available: true,
  },
  {
    name: "Budget Planner Printable",
    description: "A downloadable printable to help track monthly spending.",
    type: "printable",
    cost: 50,
    fileUrl: "/assets/printables/budget-planner.pdf",
    available: true,
  },
  {
    name: "20% off next purchase at AutoZone",
    description: "AutoZone discount coupon for your next purchase.",
    type: "coupon",
    cost: 25,
    couponCode: "AUTO20",
    available: true,
  },
  {
    name: "Publix Coupon for fresh produce",
    description: "Fresh produce coupon for Publix shoppers.",
    type: "coupon",
    cost: 25,
    couponCode: "PUBLIXFRESH",
    available: true,
  },
  {
    name: "Meal Planner Printable",
    description: "A simple meal planner for weekly meal prep.",
    type: "printable",
    cost: 50,
    fileUrl: "/assets/printables/meal-planner.pdf",
    available: true,
  },
];

const fakeUsers = [
  {
    username: "zoey123",
    email: "zoey@test.com",
    password: "password123",
    avatar: "cat",
    points: 50,
    streak: {
      current: 3,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 25),
    },
    completedLessons: [
      "mod1-lesson1",
      "mod1-lesson2",
      "mod1-lesson3",
      "mod2-lesson1",
      "mod2-lesson2",
    ],
    currentLesson: "mod2-lesson3",
    allLessonsComplete: false,
    redeemedPrizes: [],
    usedCodes: [],
  },
  {
    username: "testuser",
    email: "test@test.com",
    password: "password123",
    avatar: "robot",
    points: 0,
    streak: { current: 0, lastActive: null },
    completedLessons: [],
    currentLesson: null,
    allLessonsComplete: false,
    redeemedPrizes: [],
    usedCodes: [],
  },
  {
    username: "superlearner",
    email: "super@test.com",
    password: "password123",
    avatar: "star",
    points: 240,
    streak: {
      current: 15,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    completedLessons: Array.from({ length: 22 }, function (_, index) {
      var moduleNumber = Math.floor(index / 4) + 1;
      var lessonNumber = (index % 4) + 1;
      return "mod" + moduleNumber + "-lesson" + lessonNumber;
    }),
    currentLesson: null,
    allLessonsComplete: true,
    finalPrizeClaimed: true,
    redeemedPrizes: [],
    usedCodes: ["W15E"],
  },
  {
    username: "codechamp",
    email: "codechamp@test.com",
    password: "password123",
    avatar: "book",
    points: 235,
    streak: {
      current: 8,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    completedLessons: Array.from({ length: 22 }, function (_, index) {
      var moduleNumber = Math.floor(index / 4) + 1;
      var lessonNumber = (index % 4) + 1;
      return "mod" + moduleNumber + "-lesson" + lessonNumber;
    }),
    currentLesson: null,
    allLessonsComplete: true,
    finalPrizeClaimed: false,
    redeemedPrizes: [],
    usedCodes: ["W15E"],
  },
];

const fakeSecretCodes = [
  {
    code: "W15E",
    rewardType: "points",
    pointsValue: 15,
    active: true,
  },
  {
    code: "R2AD",
    rewardType: "points",
    pointsValue: 20,
    active: true,
  },
  {
    code: "M8XP",
    rewardType: "points",
    pointsValue: 25,
    active: true,
  },
  {
    code: "L4RN",
    rewardType: "points",
    pointsValue: 30,
    active: true,
  },
  {
    code: "B0LT",
    rewardType: "points",
    pointsValue: 10,
    active: true,
  },
];

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Promise.all([
      User.deleteMany({}),
      Prize.deleteMany({}),
      SecretCode.deleteMany({}),
    ]);

    console.log("Cleared existing users, prizes, and secret codes");

    await Prize.insertMany(fakePrizes);
    console.log("Seeded rewards catalog");

    await SecretCode.insertMany(fakeSecretCodes);
    console.log("Seeded secret codes");

    for (const userData of fakeUsers) {
      const user = new User(userData);
      await user.save();
      console.log("Created user: " + user.username + " (" + user.email + ")");
    }

    console.log("Rewards demo seed complete!");
  } catch (error) {
    console.error("Rewards demo seed error:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed();
