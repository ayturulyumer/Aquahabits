const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, required: true },
  daysRequired: { type: Number, required: true }, // Days needed to complete
  createdAt: { type: Date, default: Date.now },
});
const Quest = mongoose.model("Quest", questSchema);
module.exports = Quest;
