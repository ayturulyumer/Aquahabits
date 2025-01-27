// IMPORTANT: getAllWithUserProgress currently does 2 things: gets all quests/calculates progress for the user and pushes user's quest progress to the user document.
//  This is not ideal. We should separate these two functionalities.
// The user's quest progress should be updated separately from fetching all quests and calculating progress for the user.
// This will make the code more modular and easier to maintain.
const Quest = require("../models/Quest.js");
const User = require("../models/User.js");
const Habit = require("../models/Habit.js");
const { countStreak } = require("../utils/questsUtils.js");

// Fetch all quests and calculate progress for the user
exports.getAllWithUserProgress = async (userId) => {
  const quests = await Quest.find({});
  if (!quests) {
    throw new Error("No quests found");
  }

  // Fetch user and habits
  const user = await User.findById(userId).populate("habits").exec();
  if (!user) {
    throw new Error("User not found");
  }

  // Calculate the user's highest streak across all habits
  const highestStreak = user.habits.reduce((maxStreak, habit) => {
    const streak = countStreak(habit.history, habit.history.length); // Get the streak for the current habit
    return Math.max(maxStreak, streak);
  }, 0);

  // Get the user's quest progress
  const userQuestProgress = user.questProgress || [];

  // Calculate quest progress dynamically
  const questProgress = quests.map((quest) => {
    // Check if the user already completed this quest and didn't claim the reward
    const existingQuestProgress = userQuestProgress.find(
      (q) => q.questId.equals(quest._id) && q.isCompleted && !q.isClaimed
    );

    let currentProgress = 0; // Track the actual progress
    let isCompleted = false;
    let isClaimed = false;

    // If the quest is already completed but not claimed, skip calculating progress
    if (existingQuestProgress) {
      return {
        questId: quest._id,
        title: quest.title,
        description: quest.description,
        reward: quest.reward,
        requirement: quest.requirement,
        currentProgress: existingQuestProgress.currentProgress, // Use the saved progress
        isCompleted: true, // Already completed
        isClaimed: existingQuestProgress.isClaimed, // Use the saved claim status
      };
    }

    // Otherwise, calculate the progress based on the user's highest streak
    switch (quest.requirement) {
      case 1: // First check-in
        currentProgress = Math.min(highestStreak, 1); // Progress maxes out at 1 for this quest
        isCompleted = currentProgress >= 1;
        break;

      case 3: // 3-day streak
        currentProgress = Math.min(highestStreak, 3); // Progress maxes out at 3 for this quest
        isCompleted = currentProgress >= 3;
        break;

      case 7: // 7-day streak
        currentProgress = Math.min(highestStreak, 7); // Progress maxes out at 7 for this quest
        isCompleted = currentProgress >= 7;
        break;

      default:
        currentProgress = 0; // Unsupported requirement
        break;
    }

    return {
      questId: quest._id,
      title: quest.title,
      description: quest.description,
      reward: quest.reward,
      requirement: quest.requirement,
      currentProgress, // Reflects the user's progress dynamically
      isCompleted, // Whether the quest is done
      isClaimed, // Whether the reward has been claimed
    };
  });

  return { questProgress };
};

exports.updateQuestProgressForHabit = async (userId, habitId) => {
  const user = await User.findById(userId);

  const habit = await Habit.findOne({ _id: habitId, ownerId: userId });

  if (!user) {
    throw new Error("User not found");
  }

  if (!habit) {
    throw new Error("Habit not found");
  }

  // Fetch all quests
  const quests = await Quest.find({});
  if (!quests) throw new Error("No quests found");

  // Calculate the streak for the current habit
  const currentHabitStreak = countStreak(habit.history, habit.history.length);

  let questProgress = null;

  // Process only quests related to streak progress
  for (const quest of quests) {
    let currentProgress = 0;
    let isCompleted = false;

    // Update progress based on the quest requirement
    switch (quest.requirement) {
      case 1: // First check-in
        currentProgress = Math.min(currentHabitStreak, 1);
        isCompleted = currentProgress >= 1;
        break;

      case 3: // 3-day streak
        currentProgress = Math.min(currentHabitStreak, 3);
        isCompleted = currentProgress >= 3;
        break;

      case 7: // 7-day streak
        currentProgress = Math.min(currentHabitStreak, 7);
        isCompleted = currentProgress >= 7;
        break;

      default:
        continue; // Skip unsupported quest types
    }

    // Check if the quest is already in the user's progress
    const existingQuestProgress = user.questProgress.find((q) =>
      q.questId.equals(quest._id)
    );

    // Add or update quest progress if conditions are met
    if (isCompleted) {
      if (!existingQuestProgress) {
        // Add new quest progress
        user.questProgress.push({
          questId: quest._id,
          isCompleted,
          isClaimed: false,
          currentProgress,
        });
        // Update questProgress with the new object
        questProgress = {
          questId: quest._id,
          currentProgress,
          isCompleted,
          isClaimed: false,
        };
      } else {
        // Update existing quest progress
        existingQuestProgress.isCompleted = isCompleted;
        existingQuestProgress.currentProgress = currentProgress;
        questProgress = existingQuestProgress; // Return the updated quest progress object
      }
    }
  }

  // Save the updated user
  await user.save();

  return questProgress; // Return the updated quest progress object (or the default message)
};
