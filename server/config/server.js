const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const isProduction = process.env.NODE_ENV === "production";

const corsOptions = {
  origin: isProduction
    ? "https://aquahabits-9qgr.vercel.app"
    : "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies and authentication headers
};

const configureServer = (app) => {
  app.use(cors(corsOptions));
  app.use(express.json()); // Parse JSON
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
  app.use(cookieParser()); // Parse cookies

  console.log("Server configuration loaded successfully !");
};

module.exports = configureServer;
