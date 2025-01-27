const router = require("express").Router();
const { auth } = require("../middlewares/authMiddleware.js");
const questService = require("../services/questService.js");

router.get("/", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const { questProgress, updatedUserProgress } =
      await questService.getAllWithUserProgress(userId);
    res.status(200).json({ quests: questProgress, user: updatedUserProgress });
  } catch (err) {
    const statusCode = err.message === "No quests found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

router.post("/update-quest-progress", auth, async (req, res) => {
  const userId = req.user.id;
  const { habitId } = req.body;
  try {
    const result = await questService.updateQuestProgressForHabit(
      userId,
      habitId
    );
    console.log(result);
    // return directly the quest progress object without array
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
