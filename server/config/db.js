const mongoose = require("mongoose");
// const Quest = require("../models/Quest.js"); // Import the Quest model

// const missions = [
//   {
//     title: "Starting Strong",
//     description: "Complete your first check-in",
//     reward: 30,
//     requirement: "First Checkin", // This is one of the conditions in your calculateProgress method
//   },
//   {
//     title: "Consistency Starter",
//     description: "Complete a habit 3 days in a row",
//     reward: 80,
//     requirement: "Reach 3 days streak", // This is the condition where user has to complete a streak of 3 days
//   },
//   {
//     title: "Week of Dedication",
//     description: "Complete a habit 7 days in a row",
//     reward: 120,
//     requirement: "Reach 7 days streak", // User needs to complete 7 days of streak
//   },
// ];

const DB_URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    mongoose.connect(DB_URL);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

// async function seedQuests() {
//   try {
//     await mongoose.connect(DB_URL);

//     // Insert quests into the database
//     await Quest.insertMany(missions);

//     console.log("Quests seeded successfully");
//     mongoose.disconnect();
//   } catch (err) {
//     console.error("Error seeding quests:", err);
//   }
// }

// seedQuests();

module.exports = connectDB;
