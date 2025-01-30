const router = require("express").Router();

const usersController = require("./controllers/usersController.js");
const habitController = require("./controllers/habitController.js");
const questController = require("./controllers/questController.js");
const creatureController = require("./controllers/creatureController.js");

router.use("/auth", usersController);
router.use("/habits", habitController);
router.use("/quests", questController);
router.use("/creatures", creatureController);

module.exports = router;
