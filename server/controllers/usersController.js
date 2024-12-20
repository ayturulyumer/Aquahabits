const router = require("express").Router();
const userService = require("../services/userService.js");
const { auth } = require("../middlewares/authMiddleware.js");
const { setRefreshToken } = require("../utils/auth.js");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { newUser, accessToken, refreshToken } = await userService.register(
      name,
      email,
      password
    );

    setRefreshToken(refreshToken);

    // Send access token to the client
    res.json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      accessToken,
    });
  } catch (err) {
    const statusCode = err.message === "User already exists !" ? 400 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { existingUser, accessToken, refreshToken } = await userService.login(
      email,
      password
    );

    setRefreshToken(res, refreshToken);

    res.status(200).json({
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      accessToken,
    });
  } catch (err) {
    const statusCode = err.message === "Invalid credintials" ? 401 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userService.getUserData(userId);
    res
      .status(200)
      .json({ id: userData._id, email: userData.email, name: userData.name });
  } catch (err) {
    const statusCode = err.message === "No user found with this ID" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

router.post("/refresh-session", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Missing refresh token" });
  }

  try {
    const { newAccessToken, newRefreshToken } = await userService.refreshTokens(
      refreshToken
    );

    // set the new refresh token to cookie
    setRefreshToken(res, newRefreshToken);

    res.status(200).json(newAccessToken);
  } catch (err) {
    const statusCode = err.message === "User not found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

module.exports = router;
