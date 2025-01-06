const mongoose = require("mongoose");

const habitStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  completed: { type: Number, default: 0 },
  consistency: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
});

const HabitStats = mongoose.model("HabitStats", habitStatsSchema);

module.exports = HabitStats;
