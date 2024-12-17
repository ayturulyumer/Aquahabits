module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  accessTokenExpiry: "15m",
  refreshTokenExpiry: "7d",
};
