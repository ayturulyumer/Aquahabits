const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY;
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY;

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

const generateToken = (user, expiresIn) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn,
  });
};
