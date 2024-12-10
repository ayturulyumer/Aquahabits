const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("hello from user ");
});


module.exports = router