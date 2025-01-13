const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware.js");
const habitService = require("../services/habitService.js");

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const habits = await habitService.getAll(userId);
    res.json(habits);
  } catch (err) {
    const statusCode = err.message === "No habits found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

module.exports = router;

router.post("/create", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const habitData = req.body;

    const createdHabit = await habitService.createHabit(userId, habitData);
    res.json(createdHabit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
