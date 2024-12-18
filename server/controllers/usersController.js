const router = require("express").Router();
const userService = require("../services/userService.js");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userService.register(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // prevents client-side from accessing the cookie
      secure: false, // cookie is sent  only over https
      sameSite: "none", // The cookie is only sent for same-site requests, preventing cross-origin misuse. - CHANGE LATER
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    });

    // Send access token to the client
    res.json({ accessToken });
  } catch (err) {
    const statusCode = err.message === "User already exists !" ? 400 : 500;
    res.status(statusCode).json({error:  err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userService.login(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    const statusCode = err.message === "Invalid credintials" ? 401 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

module.exports = router;
