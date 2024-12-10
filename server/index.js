const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3030, () => console.log("Server listening"));
