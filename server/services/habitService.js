const Habit = require("../models/Habit");
const User = require("../models/User");

exports.getAll = async (userId) => {
  const habits = await Habit.find({ ownerId: userId }).exec();

  if (!habits) {
    throw new Error("No habits found");
  }

  return habits;
};

// **Creates a new habit for the user**
exports.createHabit = async (userId, habitData) => {
  // Step 1: Validate user
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Step 2: Create habit
  const newHabit = await Habit.create({ ...habitData, ownerId: userId });

  // Step 3: Link habit to user
  user.habits.push(newHabit._id);
  await user.save();

  return newHabit;
};
