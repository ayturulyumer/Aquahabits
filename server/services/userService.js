const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User.js");

const { generateToken } = require("../utils/auth.js");

const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY;
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY;

// Registers user
exports.register = async (email, password) => {
  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists !");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword });

  const accessToken = generateToken(newUser, JWT_ACCESS_EXPIRY);
  const refreshToken = generateToken(newUser, JWT_REFRESH_EXPIRY);

  return { accessToken, refreshToken };
};

exports.login = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credintials" });
  }

  const accessToken = generateToken(existingUser, JWT_ACCESS_EXPIRY);
  const refreshToken = generateToken(existingUser, JWT_REFRESH_EXPIRY);

  return { accessToken, refreshToken };
};
