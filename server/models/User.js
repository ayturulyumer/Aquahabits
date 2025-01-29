const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habit" }],
  aquaCoins: { type: Number, default: 0 },
  questProgress: [
    {
      questId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quest",
        index: true,
      }, // Link to the Quest
      currentProgress: { type: Number, default: 0 }, // Progress made by the user (e.g., streak count)
      isCompleted: { type: Boolean, default: false }, // True if the user has completed the quest
      isClaimed: { type: Boolean, default: true }, // True if the reward hasn't been claimed yet
    },
  ],
  creatures: [
    {
      creatureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Creature", // Reference to the Creature model
        required: true,
      },
      level: {
        type: Number,
        default: 1, // Default level for the user's creature
      },
      size: {
        type: String,
        enum: ["small", "medium", "large"],
        default: "small", // Default size for the user's creature
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ email: 1 });
userSchema.index({ name: 1 });
userSchema.index({ "questProgress.questId": 1 });

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
