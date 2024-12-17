require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");

const routes = require("./routes.js");

const app = express();

// Middleware for parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(routes);

app.listen(3030, () => console.log("Server listening"));
