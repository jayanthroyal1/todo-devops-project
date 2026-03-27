const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const redis = require("./config/redis");
const { apiLimiter, limiter } = require("./middleware/rateLimit");
const requestId = require("./config/requestId");
const errorHandler = require("./middleware/error");
const logger = require("./utils/logger");

const app = express();

// Middleware
app.use(express.json());
// 🔐 Security
// app.use(helmet());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

const allowedOrigins = [
  "http://localhost:3000",
  "http://13.235.195.153",
  "http://13.235.195.153:3000",
];

// 🌍 CORS (dynamic for prod)
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman / curl

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true,
};

// Apply CORS
app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// 🚫 Rate Limiting
app.use(limiter);
// 🧾 Request ID
app.use(requestId);
// 📊 Logging
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

// Routes
app.use("/api/auth", apiLimiter, require("./routes/auth.routes"));
app.use("/api/todos", require("./routes/todo.routes"));

// Health
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend Working 🚀" });
});

app.get("/db-test", async (req, res) => {
  res.send("MongoDB Connected 🚀");
});

app.get("/redis-test", async (req, res) => {
  await redis.set("test", "Hello Redis from Jay");
  const value = await redis.get("test");
  res.json({ redis: value });
});

// ❌ Error handler MUST be last
app.use(errorHandler);

module.exports = app;
