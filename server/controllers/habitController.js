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
