// Calculate bonus points based on the user's current streak length
const calculateStreakBonus = (streakCount) => {
  if (streakCount >= 30) return 10;
  if (streakCount >= 14) return 7;
  if (streakCount >= 7) return 5;
  if (streakCount >= 3) return 2;
  return 0;
};

// Award base points plus a streak bonus to the user and save
const awardPoints = async (user, basePoints) => {
  const bonus = calculateStreakBonus(user.streak.current);
  user.points += basePoints + bonus;
  await user.save();
  return { basePoints, bonus, total: basePoints + bonus };
};

module.exports = { calculateStreakBonus, awardPoints };
