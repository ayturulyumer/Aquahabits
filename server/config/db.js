const mongoose = require("mongoose");

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

module.exports = connectDB;
