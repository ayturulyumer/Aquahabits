const router = require("express").Router();

const usersController = require("./controllers/usersController.js");
const habitController = require("./controllers/habitController.js");

router.use("/auth", usersController);
router.use("/habits", habitController);

module.exports = router;
