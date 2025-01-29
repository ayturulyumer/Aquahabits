const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rarity: {
    type: String,
    enum: ["common", "rare", "legendary"],
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  growthCost: {
    level2: {
      type: Number,
      required: true,
    },
    level3: {
      type: Number,
      required: true,
    },
  },
  icon: {
    type: String, // URL to the icon image
    required: true,
  },
});

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;
