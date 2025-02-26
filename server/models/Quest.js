const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  reward: { type: Number, required: true },
  requirement: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  iconUrl: { type: String, required: true },
});

const Quest = mongoose.model("Quest", questSchema);
module.exports = Quest;
