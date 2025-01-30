const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware.js");
const creatureService = require("../services/creatureService");

router.get("/", auth, async (req, res) => {
  try {
    const creatures = await creatureService.getAll();
    res.status(200).json(creatures);
  } catch (err) {
    const statusCode = err.message === "No creatures found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

module.exports = router;
