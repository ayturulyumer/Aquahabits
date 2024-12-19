const router = require("express").Router();
const userService = require("../services/userService.js");
const { auth } = require("../middlewares/authMiddleware.js");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { newUser, accessToken, refreshToken } = await userService.register(
      name,
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

module.exports = router;
