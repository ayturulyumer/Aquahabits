const router = require("./habitController.js");
const { auth } = require("../middlewares/authMiddleware.js");
const creatureService = require("../services/creatureService");

router.get("/", auth, async (req, res) => {
  try {
    const creatures = await creatureService.getAll();
    res.json(creatures);
  } catch (err) {
    const statusCode = err.message === "No creatures found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});
