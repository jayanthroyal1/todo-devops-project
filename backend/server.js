require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
require("./config/redis");

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

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
