require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

const routes = require("./routes.js");

const app = express();

// Middleware for parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose
  .connect(DB_URL)
  .then(() => console.log("Successfully connected to DB"))
  .catch((err) => console.log(err));

app.listen(3030, () => console.log("Server listening"));
