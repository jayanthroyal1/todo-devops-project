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

app.use(limiter);

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(errorHandler);

app.use(morgan("dev"));

app.use(morgan("combined"), {
  stream: {
    write: (message) => logger.info(message.trim),
  },
});

app.use(requestId);

// Connect DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on 🚀 Port ${PORT}`);
});
