const express = require("express");
const redis = require("./config/redis");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
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
