const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User.js");
const Creature = require("../models/Creature.js");

const { generateToken } = require("../utils/auth.js");

const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY;
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY;
const JWT_SECRET = process.env.JWT_SECRET;

// Registers user
exports.register = async (name, email, password) => {
  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists !");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });

  // Don't return password
  const userWithoutPassword = newUser.toObject(); // Convert to plain JavaScript object
  delete userWithoutPassword.password; // Remove the password field

  const accessToken = generateToken(newUser, JWT_ACCESS_EXPIRY);
  const refreshToken = generateToken(newUser, JWT_REFRESH_EXPIRY);

  return { userWithoutPassword, accessToken, refreshToken };
};

exports.login = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error("Invalid credintials !");
  }

  const isPasswordValid = bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credintials !");
  }

  // Don't return password
  const userWithoutPassword = existingUser.toObject(); // Convert to plain JavaScript object
  delete userWithoutPassword.password; // Remove the password field

  const accessToken = generateToken(existingUser, JWT_ACCESS_EXPIRY);
  const refreshToken = generateToken(existingUser, JWT_REFRESH_EXPIRY);

  return { userWithoutPassword, accessToken, refreshToken };
};

exports.getUserData = async (userId) => {
  const userData = await User.findById(userId).select("-password").lean();
  if (!userData) {
    throw new Error("User not found");
  }
  return userData;
};

exports.refreshTokens = async (refreshToken) => {
  const decodedUser = jwt.verify(refreshToken, JWT_SECRET);

  const user = await User.findById(decodedUser.id);

  if (!user) {
    throw new Error("User not found");
  }

  const newAccessToken = generateToken(user, JWT_ACCESS_EXPIRY);
  const newRefreshToken = generateToken(user, JWT_REFRESH_EXPIRY);

  return { newAccessToken, newRefreshToken };
};

exports.addCreature = async (userId, creatureData) => {
  const user = await User.findById(userId);
  const creature = await Creature.findById(creatureData.creatureId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!creature) {
    throw new Error("Creature not found");
  }

  // Deduct AquaCoins before adding the creature
  if (creature.cost > user.aquaCoins) {
    throw new Error("Not enough AquaCoins");
  }
  user.aquaCoins -= creature.cost;

  // Create a new creature object
  user.creatures.push({
    creatureId: creatureData.creatureId,
    level: 1, // Default level
    size: "small", // Default size
    coordinates: {
      x: creatureData.coordinates.x,
      y: creatureData.coordinates.y,
    },
  });

  // Get the newly added creature (last item in the array)
  const addedCreature = user.creatures[user.creatures.length - 1];

  await user.save();

  return { addedCreature, aquaCoins: user.aquaCoins };
};

exports.levelUpCreature = async (userId, creatureModelId, userCreatureId) => {
  // Step 1: Find the user
  const user = await User.findById(userId);
  const baseCreature = await Creature.findById(creatureModelId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!baseCreature) {
    throw new Error("Creature not found");
  }

  // Step 2: Find the creature in the user's creatures list
  const creatureIndex = user.creatures.findIndex(
    (creature) => creature._id.toString() === userCreatureId
  );

  if (creatureIndex === -1) {
    throw new Error("Creature not found in user's creatures list");
  }

  const creature = user.creatures[creatureIndex];

  // Step 3: Check if the creature has reached the maximum level (3)
  if (creature.level >= 3) {
    throw new Error("Creature has reached the maximum level");
  }

  // Step 4: Determine the growth cost based on the level
  let growthCost = 0;

  if (creature.level === 1) {
    console.log(baseCreature)
    growthCost = baseCreature.growthCost.level2; // Cost for leveling up from level 1 to 2
  } else if (creature.level === 2) {
    growthCost = baseCreature.growthCost.level3; // Cost for leveling up from level 2 to 3
  }

  // Step 5: Check if the user has enough AquaCoins
  if (user.aquaCoins < growthCost) {
    throw new Error("Not enough AquaCoins to level up the creature");
  }

  // Step 6: Deduct the AquaCoins
  user.aquaCoins -= growthCost;

  // Step 7: Level up the creature
  creature.level += 1; // Increase level by 1

  // Step 8: Adjust the creature's size based on the new level
  if (creature.level === 2) {
    creature.size = "medium"; // Size changes to medium at level 2
  } else if (creature.level === 3) {
    creature.size = "large"; // Size changes to large at level 3
  }

  await user.save(); // Save the user with updated AquaCoins and creatures


  // Step 9: Return the updated creature and AquaCoins
  return {
    updatedCreature: creature,
    updatedAquaCoins: user.aquaCoins,
  };
};
