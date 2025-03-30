const router = require("express").Router();
const {
  authLimiter,
  habitsLimiter,
} = require("./middlewares/rateLimitsMiddelware.js");

const usersController = require("./controllers/usersController.js");
const habitController = require("./controllers/habitController.js");
const questController = require("./controllers/questController.js");
const creatureController = require("./controllers/creatureController.js");

router.use("/auth", authLimiter, usersController);
router.use("/habits", habitsLimiter, habitController);
router.use("/quests", questController);
router.use("/creatures", creatureController);

module.exports = router;
