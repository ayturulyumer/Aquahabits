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
      secure: true, // cookie is sent  only over https
      sameSite: "strict", // The cookie is only sent for same-site requests, preventing cross-origin misuse.
    });

    // Send access token to the client
    res.json({ accessToken });
  } catch (err) {
    const statusCode = err.message === "User already exists" ? 400 : 500;
    res.status(statusCode).json({ message: err.message });
  }
  res.end();
});

router.get("/", async (req, res) => {
  res.send("Hiii");
});

module.exports = router;
