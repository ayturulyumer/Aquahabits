const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habit" }],
  habitStats: { type: mongoose.Schema.Types.ObjectId, ref: "HabitStats" },
  creatures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Creature" }],
  aquaCoins: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
