const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: String,
  rarity: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  level: { type: Number, default: 1 },
  position: { row: Number, col: Number },
});

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;
