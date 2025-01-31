const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware.js");
const creatureService = require("../services/creatureService");
const userService = require("../services/userService");

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

router.post("/add-creature", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const creatureData = req.body;

    const { creatures, aquaCoins } = await userService.addCreature(
      userId,
      creatureData
    );

    res.status(200).json({ creatures, aquaCoins });
  } catch (err) {
    const statusCode = err.message === "User not found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});
