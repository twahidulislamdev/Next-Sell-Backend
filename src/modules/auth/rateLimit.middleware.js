const rateLimit = require("express-rate-limit");

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message:
    "Too many accounts created from this IP address. Please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message:
    "Too many login attempts from this IP address. Please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

const refreshTokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message:
    "Too many refresh token requests from this IP address. Please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message:
    "Too many requests from this IP address. Please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  registerLimiter,
  loginLimiter,
  refreshTokenLimiter,
  apiLimiter,
};
