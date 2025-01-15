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
  // Streak calculation
  const sortedHistory = this.history.sort((a, b) => a - b);
  let streak = 0;
  let currentStreak = 0;

  for (let i = sortedHistory.length - 1; i >= 0; i--) {
    const currentDate = sortedHistory[i];
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    if (
      i === sortedHistory.length - 1 ||
      currentDate.getTime() === previousDate.getTime()
    ) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }

    streak = Math.max(streak, currentStreak);
  }

  this.streak = streak;

  // Completed count calculation
  this.completed = this.history.length;

  // Consistency calculation
  // Consistency calculation
  const totalDays =
    (new Date() - new Date(this.createdAt)) / (1000 * 60 * 60 * 24);
  const completedDays = this.history.length;
  this.consistency = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
};

// Pre-save hook to update stats whenever habit is saved
habitSchema.pre("save", function (next) {
  this.updateStats(); // Update stats before saving
  next();
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
