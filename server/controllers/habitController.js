const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware.js");
const habitService = require("../services/habitService.js");

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const habits = await habitService.getAll(userId);
    res.json(habits);
  } catch (err) {
    const statusCode = err.message === "No habits found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

module.exports = router;

router.post("/create", auth, async (req, res) => {
  const userId = req.user.id;
  const habitData = req.body;

  try {
    const createdHabit = await habitService.createHabit(userId, habitData);
    res.json(createdHabit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:habitId", auth, async (req, res) => {
  const { habitId } = req.params;
  const habitData = req.body;

  try {
    const updatedHabit = await habitService.editHabit(habitId, habitData);
    res.status(200).json(updatedHabit);
  } catch (err) {
    const statusCode = err.message === "Habit not found" ? 404 : 400;
    res.status(statusCode).json({ message: err.message });
  }
});

router.delete("/:habitId", auth, async (req, res) => {
  const userId = req.user.id;
  const { habitId } = req.params;
  try {
    const result = await habitService.deleteHabit(habitId, userId);
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/check-in", auth, async (req, res) => {
  const userId = req.user.id;
  const { habitId } = req.body;
  try {
    const result = await habitService.checkInHabit(userId, habitId);
    res
      .status(200)
      .json({ message: result.message, userCoins: result.userCoins });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
