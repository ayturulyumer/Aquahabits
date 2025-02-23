const countStreak = (history, days) => {
  if (history.length === 0) return 0; // No check-ins, return streak 0
  history = history.map((date) => new Date(date).setHours(0, 0, 0, 0)); // Normalize dates
  history.sort((a, b) => a - b); // Sort dates ascending

  let streak = 0;
  let currentStreak = 1; // Start streak from 0 (not 1)

  for (let i = 1; i < history.length; i++) {
    const diffInDays = (history[i] - history[i - 1]) / (1000 * 60 * 60 * 24); // Calculate day difference

    if (diffInDays === 1) {
      currentStreak++; // Increment streak if consecutive days
    } else {
      streak = Math.max(streak, currentStreak); // Track the maximum streak
      currentStreak = 1; // Reset streak to 1 for new sequence
    }
  }

  streak = Math.max(streak, currentStreak); // Final streak check

  return streak;
};

module.exports = { countStreak };
