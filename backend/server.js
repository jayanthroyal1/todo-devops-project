require("dotenv").config();

const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = require("./app");
const connectDB = require("./config/db");
const { limiter } = require("./middleware/rateLimit");
const errorHandler = require("./middleware/error");
const logger = require("./utils/logger");
const requestId = require("./config/requestId");

require("./config/redis");

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

// 🔐 Security
app.use(helmet());

// 🚫 Rate Limiting
app.use(limiter);

// 🌍 CORS (dynamic for prod)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  }),
);

// 🧾 Request ID
app.use(requestId);

// 📊 Logging
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()), // ✅ FIXED
    },
  }),
);

// ❌ Error handler MUST be last
app.use(errorHandler);

// Start only after DB is ready
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, HOST, () => {
      console.log(`Server running on 🚀 Port ${PORT} and Host ${HOST}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

// ❗ IMPORTANT: Routes should be inside app.js
