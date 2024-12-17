const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const configureServer = (app) => {
  app.use(express.json()); // Parse JSON
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
  app.use(cookieParser()); // Parse cookies
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  console.log("Server configuration loaded successfully !");
};

module.exports = configureServer;
