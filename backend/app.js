const express = require("express");
const redis = require("./config/redis");
const { apiLimiter } = require("./middleware/rateLimit");

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

// Routes
app.use("/api/auth", apiLimiter, require("./routes/auth.routes"));
app.use("/api/todos", require("./routes/todo.routes"));

// Health
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.get("/db-test", async (req, res) => {
  res.send("MongoDB Connected 🚀");
});

app.get("/redis-test", async (req, res) => {
  await redis.set("test", "Hello Redis from Jay");
  const value = await redis.get("test");
  res.json({ redis: value });
});

module.exports = app;
