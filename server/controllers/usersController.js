const router = require("express").Router();
const userService = require("../services/userService.js");
const { auth } = require("../middlewares/authMiddleware.js");
const { setRefreshToken } = require("../utils/auth.js");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { userWithoutPassword, accessToken, refreshToken } =
      await userService.register(name, email, password);
    setRefreshToken(res, refreshToken);

    // Send access token to the client
    res.status(200).json({
      user: userWithoutPassword,
      accessToken,
    });
  } catch (err) {
    console.log(err);
    const statusCode = err.message === "User already exists !" ? 400 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { userWithoutPassword, accessToken, refreshToken } =
      await userService.login(email, password);

    setRefreshToken(res, refreshToken);

    res.status(200).json({
      user: userWithoutPassword,
      accessToken,
    });
  } catch (err) {
    const statusCode = err.message === "Invalid credintials" ? 401 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

router.post("/logout", auth, (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error logging out" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userService.getUserData(userId);
    res.status(200).json(userData);
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

router.post("/addCreature", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const creatureData = req.body;

    const result = await userService.addCreature(userId, creatureData);

    res.status(200).json(result);
  } catch (err) {
    const statusCode = err.message === "User not found" ? 404 : 500;
    res.status(statusCode).json({ message: err.message });
  }
});

module.exports = router;
