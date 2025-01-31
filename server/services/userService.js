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

  // Add the creature to the user's creatures array

  const newCreature = {
    creatureId: creatureData.creatureId,
    coordinates: {
      x: creatureData.coordinates.x,
      y: creatureData.coordinates.y,
    },
  };

  user.creatures.push(newCreature);

  // Deduct AquaCoins for the cost
  if (creature.cost > user.aquaCoins) {
    throw new Error("Not enough AquaCoins");
  }

  user.aquaCoins -= creature.cost;

  await user.save();

  return { addedCreature: newCreature, aquaCoins: user.aquaCoins };
};
