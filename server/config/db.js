const mongoose = require("mongoose");
// const Quest = require("../models/Quest.js"); // Import the Quest model
// const Creature = require("../models/Creature.js"); // Import the Creature model

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

// Seed the database with creatures and their growth costs
// const ITEM_TYPES = [
//   {
//     name: "Seahorse",
//     rarity: "common",
//     cost: 35,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147899/seahorse_f6uvbw.png",
//   },
//   {
//     name: "Clownfish",
//     rarity: "common",
//     cost: 45,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147867/clownfish_vtthkl.png",
//   },
//   {
//     name: "Crab",
//     rarity: "common",
//     cost: 55,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147882/crab_mtgdtm.png",
//   },
//   {
//     name: "Jellyfish",
//     rarity: "rare",
//     cost: 70,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147882/jellyfish_g7bpgh.png",
//   },
//   {
//     name: "Piranha",
//     rarity: "rare",
//     cost: 90,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147898/piranha_sirwcb.png",
//   },
//   {
//     name: "Stingray",
//     rarity: "rare",
//     cost: 95,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147902/stringray_p1q1z9.png",
//   },
//   {
//     name: "Starfish",
//     rarity: "epic",
//     cost: 120,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147901/starfish_avywbv.png",
//   },
//   {
//     name: "Dolphin",
//     rarity: "epic",
//     cost: 140,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147881/dolphin_tho0lw.png",
//   },
//   {
//     name: "Octopus",
//     rarity: "epic",
//     cost: 160,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147898/octopus_mzfwn8.png",
//   },
//   {
//     name: "Sea Turtle",
//     rarity: "epic",
//     cost: 175,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147900/seaturtle_cqlfyk.png",
//   },
//   {
//     name: "Shark",
//     rarity: "epic",
//     cost: 220,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147901/shark_jj86xa.png",
//   },
//   {
//     name: "Whale",
//     rarity: "legendary",
//     cost: 250,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147904/whale_sukixr.png",
//   },
//   {
//     name: "Kraken",
//     rarity: "legendary",
//     cost: 280,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147898/kraken_mfnjzi.png",
//   },
//   {
//     name: "Axolotl",
//     rarity: "legendary",
//     cost: 310,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147771/axolotl_f4sbsj.png",
//   },
//   {
//     name: "Triturus",
//     rarity: "legendary",
//     cost: 360,
//     icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147903/triturus_jaomyr.png",
//   },
// ];

// const GROWTH_COSTS = {
//   common: { level2: 20, level3: 40 },
//   rare: { level2: 40, level3: 70 },
//   epic: { level2: 70, level3: 120 },
//   legendary: { level2: 120, level3: 240 },
// };

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

// Seed the database with creatures and their growth costs
// const seedDatabase = async () => {
//   try {
//     await mongoose.connect(DB_URL);

//     console.log("🔥 Connected to MongoDB...");

//     // Add creatures with correct growth costs
//     const creaturesToInsert = ITEM_TYPES.map((creature) => ({
//       ...creature,
//       growthCost: GROWTH_COSTS[creature.rarity], // Assign correct growth cost
//     }));

//     await Creature.insertMany(creaturesToInsert);
//     console.log("✅ Creatures seeded successfully!");

//     mongoose.connection.close();
//     console.log("🔌 Database connection closed.");
//   } catch (error) {
//     console.error("❌ Error seeding database:", error);
//     mongoose.connection.close();
//   }
// };

// // Run the seed script
// seedDatabase();

module.exports = connectDB;
