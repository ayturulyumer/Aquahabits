const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware.js");
const questService = require("../services/questService.js");

router.get("/", auth, async (req, res) => {
  try {
    const quests = await questService.getAll();
    res.json(quests);
  } catch (err) {
    const statusCode = err.message === "No quests found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

module.exports = router;
