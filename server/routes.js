const router = require("express").Router();

const usersController = require("./controllers/usersController.js");
const habitController = require("./controllers/habitController.js");
const questController = require("./controllers/questController.js");

router.use("/auth", usersController);
router.use("/habits", habitController);
router.use("/quests", questController);

module.exports = router;
