const mongoose = require("mongoose");
// const Quest = require("../models/Quest.js"); // Import the Quest model

// const missions = [
//   {
//     id: 1,
//     title: "First win of the day",
//     description: "Complete a habit for the first time today",
//     points: 25,
//     daysRequired: 1,
//   },
//   {
//     id: 2,
//     title: "Consistency Starter",
//     description: "Complete a habit 3 days in a row",
//     points: 50,
//     daysRequired: 3,
//   },
//   {
//     id: 3,
//     title: "Daily Streak",
//     description: "Complete any habit for 5 consecutive days",
//     points: 75,
//     daysRequired: 5,
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

// Quest Seeding
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
