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

router.post("/add-creature", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const creatureData = req.body;

    const { addedCreature, aquaCoins } = await userService.addCreature(
      userId,
      creatureData
    );

    res.status(200).json({ addedCreature, aquaCoins });
  } catch (err) {
    const statusCode = err.message === "User not found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

router.post("/remove-creature", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { creatureModelId, userCreatureId } = req.body;
    const { updatedAquaCoins } = await userService.removeCreature(
      userId,
      creatureModelId,
      userCreatureId
    );
    res.status(200).json({ updatedAquaCoins });
  } catch (err) {
    const statusCode = err.message === "User not found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

router.patch("/levelup-creature", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { creatureModelId, userCreatureId } = req.body;

    const { updatedCreature, updatedAquaCoins } =
      await userService.levelUpCreature(
        userId,
        creatureModelId,
        userCreatureId
      );

    res.status(200).json({ updatedCreature, updatedAquaCoins });
  } catch (err) {
    const statusCode = err.message === "User not found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

module.exports = router;
