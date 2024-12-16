const router = require("express").Router();
const userService = require("../services/userService.js");

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body)
    const result = await userService.register(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  res.end();
});

router.get("/",async (req,res) => {
  res.send("Hiii")
})

module.exports = router;
