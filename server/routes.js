const router = require("express").Router();

const usersController = require("./controllers/usersController.js");

router.use("/auth", usersController);

module.exports = router;
