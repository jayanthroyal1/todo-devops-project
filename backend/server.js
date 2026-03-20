require("dotenv").config();
const express = require("express");

// From Local
const connectDB = require("./config/db");
const redis = require("./config/redis");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("Backend + Docker Compose 🚀");
});

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

app.listen(PORT, () => {
  console.log(`Server is running on 🚀 Port ${PORT}`);
});
