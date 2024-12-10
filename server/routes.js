const router = require("express").Router();

const usersController = require("./controllers/usersController.js");

router.use("/users", usersController);

module.exports = router;
