const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


// Generates both refresh/accessToken depending on the payload and expiration date
const generateToken = (user, expiresIn) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn,
  });
};

module.exports = { generateToken };
