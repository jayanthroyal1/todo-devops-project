const rateLimit = require("express");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // max 100 requests per IP
  message: {
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: true,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10, // max 100 requests per IP
  message: {
    status: 429,
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter, apiLimiter };
