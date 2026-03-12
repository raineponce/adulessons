const awardPoints = async (user, points, type) => {
  const normalizedPoints = Number(points) || 0;

  if (typeof user.totalPoints !== "number") {
    user.totalPoints = 0;
  }

  if (!Array.isArray(user.activityLog)) {
    user.activityLog = [];
  }

  user.totalPoints += normalizedPoints;
  user.activityLog.push({
    type,
    points: normalizedPoints,
    createdAt: new Date(),
  });

  await user.save();

  return {
    totalPoints: user.totalPoints,
    points: normalizedPoints,
    type,
  };
};

module.exports = { awardPoints };
