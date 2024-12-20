const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Generates both refresh/accessToken depending on the payload and expiration date
const generateToken = (user, expiresIn) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn,
  });
};

const setRefreshToken = (refreshToken) => {
  return res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevents client-side from accessing the cookie
    secure: false, // cookie is sent  only over https
    sameSite: "lax", // The cookie is only sent for same-site requests, preventing cross-origin misuse. - CHANGE LATER
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  });
};

module.exports = { generateToken, setRefreshToken };
