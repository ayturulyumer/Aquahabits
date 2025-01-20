const Habit = require("../models/Habit");
const User = require("../models/User");
const COIN_REWARD = 20; 

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

exports.editHabit = async (habitId, habitData) =>
  Habit.findByIdAndUpdate(habitId, habitData, { new: true });

exports.deleteHabit = async (habitId, userId) => {
  await User.findByIdAndUpdate(userId, {
    $pull: { habits: habitId },
  });

  await Habit.findByIdAndDelete(habitId);
};

exports.checkInHabit = async (userId, habitId) => {
  const habit = await Habit.findOne({ _id: habitId, ownerId: userId });
  const user = await User.findById(userId);

  if (!habit) {
    throw new Error("Habit not found");
  }

  if (!user) {
    throw new Error("User not found");
  }

  const today = new Date();
  // Normalize the current date to midnight in UTC
  const normalizedToday = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  );

  // Check if today is already in the history (compare only the date part)
  if (
    habit.history.some(
      (date) =>
        new Date(date).toISOString().split("T")[0] ===
        normalizedToday.toISOString().split("T")[0]
    )
  ) {
    // If already checked in, remove today's date (uncheck)
    habit.history = habit.history.filter(
      (date) =>
        new Date(date).toISOString().split("T")[0] !==
        normalizedToday.toISOString().split("T")[0]
    );
    // Deduct coins if checking out, ensuring balance doesn't go below 0
    if (user.aquaCoins >= COIN_REWARD) {
      user.aquaCoins -= COIN_REWARD;
    } else {
      user.aquaCoins = 0; // Ensure AquaCoins can't go below 0
    }
    await habit.save();
    await user.save();

    return { message: "Checkout", userCoins: user.aquaCoins };
  } else {
    // If not checked in, add today's date
    habit.history.push(normalizedToday);
    user.aquaCoins += COIN_REWARD;
    await habit.save();
    await user.save();
    return { message: "Checkin", userCoins: user.aquaCoins };
  }
};
