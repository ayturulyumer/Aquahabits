const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User.js");

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

  const accessToken = generateToken(newUser, JWT_ACCESS_EXPIRY);
  const refreshToken = generateToken(newUser, JWT_REFRESH_EXPIRY);

  return { newUser, accessToken, refreshToken };
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

  const accessToken = generateToken(existingUser, JWT_ACCESS_EXPIRY);
  const refreshToken = generateToken(existingUser, JWT_REFRESH_EXPIRY);

  return { existingUser, accessToken, refreshToken };
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

  const newAccessToken = generateToken(existingUser, JWT_ACCESS_EXPIRY);
  const newRefreshToken = generateToken(existingUser, JWT_REFRESH_EXPIRY);

  return { newAccessToken, newRefreshToken };
};
