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
  createdAt: { type: Date, default: Date.now },
});

// Method to calculate streak, completed count, and consistency
habitSchema.methods.updateStats = function () {
  // Ensure history is sorted chronologically
  const sortedHistory = this.history.sort((a, b) => a - b);

  let streak = 0;
  let currentStreak = 1; // Start with 1 for the first date

  for (let i = sortedHistory.length - 1; i > 0; i--) {
    const currentDate = new Date(sortedHistory[i]);
    const previousDate = new Date(sortedHistory[i - 1]);

    // Calculate the difference in days
    const diffInTime = currentDate.getTime() - previousDate.getTime();
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentStreak++; // Increment streak if consecutive
    } else {
      currentStreak = 1; // Reset streak
    }

    streak = Math.max(streak, currentStreak); // Track maximum streak
  }

  // Edge case: If there's only one date in the history, streak is 1
  this.streak = sortedHistory.length > 0 ? Math.max(streak, currentStreak) : 0;

  // Completed count calculation
  this.completed = this.history.length;

  // Consistency calculation
  const totalDays =
    (new Date() - new Date(this.createdAt)) / (1000 * 60 * 60 * 24);
  const completedDays = this.history.length;

  this.consistency =
    totalDays > 0
      ? Math.max(
          0,
          Math.min(100, Math.floor((completedDays / totalDays) * 100))
        )
      : 0;
};

// Pre-save hook to update stats whenever habit is saved
habitSchema.pre("save", function (next) {
  this.updateStats(); // Update stats before saving
  next();
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
