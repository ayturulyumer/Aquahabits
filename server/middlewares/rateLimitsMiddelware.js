const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 10,
  message: "Too many authentication attempts, please try again later.",
});

const habitsLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Allow 100 requests per minute for habit tracking
  message: "Too many requests, please try again in 1 minute.",
});

module.exports = { authLimiter, habitsLimiter };
