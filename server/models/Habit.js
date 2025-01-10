const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  frequency: { type: String, required: true },
  goal: { type: String, required: false },
  selectedDays: { type: [String], default: [] }, // Only for weekly habits
  timesPerWeek: { type: Number, required: true },
  history: [{ type: Date }],
  streak: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;

