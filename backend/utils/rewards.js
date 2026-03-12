const awardPoints = async (user, points, type, metadata = {}) => {
  const normalizedPoints = Number(points) || 0;

  if (typeof user.totalPoints !== "number") {
    user.totalPoints = 0;
  }

  if (!Array.isArray(user.activityLog)) {
    user.activityLog = [];
  }

  const {
    lessonId = null,
    lessonName = null,
    moduleId = null,
    moduleName = null,
  } = metadata;

  user.totalPoints += normalizedPoints;
  user.activityLog.push({
    type,
    points: normalizedPoints,
    lessonId,
    lessonName,
    moduleId,
    moduleName,
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
