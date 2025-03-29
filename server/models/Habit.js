const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  frequency: { type: String, required: true },
  goal: { type: String, required: false },
  selectedDays: { type: [String], default: [] }, // Only for weekly habits
  history: [{ type: Date }],
  streak: { type: Number, default: 0 }, // Store streak
  completed: { type: Number, default: 0 }, // Store completed count
  consistency: { type: Number, default: 0 }, // Store consistency
  consistencyChangePercent: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Method to calculate streak, completed count, and consistency
habitSchema.methods.updateStats = function () {
  // Ensure history is sorted chronologically
  const sortedHistory = this.history
    .map((entry) => new Date(entry))
    .sort((a, b) => a - b);

  let streak = 0;
  let currentStreak = 1; // Start with 1 for the first date
  let missedDays = 0; // Track the number of missed days

  for (let i = sortedHistory.length - 1; i > 0; i--) {
    const currentDate = sortedHistory[i];
    const previousDate = sortedHistory[i - 1];

    // Calculate the difference in days
    const diffInDays = (currentDate - previousDate) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentStreak++; // Increment streak if consecutive
    } else {
      currentStreak = 1; // Reset streak
      missedDays += Math.floor(diffInDays) - 1; // Correct gap calculation
    }

    streak = Math.max(streak, currentStreak); // Track maximum streak
  }

  // Edge case: If there's only one date in the history, streak is 1
  this.streak = sortedHistory.length > 0 ? Math.max(streak, currentStreak) : 0;

  // Completed count calculation
  this.completed = this.history.length;

  // Consistency calculation
  const today = new Date();
  const firstCheckIn = sortedHistory.length > 0 ? sortedHistory[0] : today;
  const totalDays = Math.max(1, (today - firstCheckIn) / (1000 * 60 * 60 * 24)); // Ensure at least 1 day

  // Include missed days from last check-in → today
  if (sortedHistory.length > 0) {
    const lastCheckIn = sortedHistory[sortedHistory.length - 1];
    const gapToToday = (today - lastCheckIn) / (1000 * 60 * 60 * 24);
    if (gapToToday > 1) {
      missedDays += Math.floor(gapToToday) - 1;
    }
  }

  // Calculate the normal consistency first
  let normalConsistency =
    totalDays > 0 ? Math.round((this.completed / totalDays) * 100) : 0;

  // Penalize for missed days (e.g., subtract 2% for each missed day)
  const penalty = missedDays * 1; // 2% penalty per missed day
  const newConsistency = Math.max(
    0,
    Math.min(100, normalConsistency - penalty)
  );

  this.consistencyChangePercent =
    Math.round((newConsistency - this.consistency) * 10) / 10;
  this.consistency = newConsistency;
};

// Pre-save hook to update stats whenever habit is saved
habitSchema.pre("save", function (next) {
  this.updateStats(); // Update stats before saving
  next();
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
