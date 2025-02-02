const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from frontend
  methods: "GET,POST,PUT,PATCH,DELETE", // You can specify methods you want to allow
  allowedHeaders: "Content-Type, Authorization", // You can specify headers you want to allow
  credentials: true, // Allow cookies if needed
};

const configureServer = (app) => {
  app.use(express.json()); // Parse JSON
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
  app.use(cookieParser()); // Parse cookies
  app.use(cors(corsOptions));

  console.log("Server configuration loaded successfully !");
};

module.exports = configureServer;
