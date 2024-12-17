require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const configureServer = require("./config/server.js");

const PORT = process.env.PORT;

const routes = require("./routes.js");

const app = express();

connectDB();
configureServer();

app.use(routes);

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
