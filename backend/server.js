require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
require("./config/redis");

const PORT = process.env.PORT || 5000;

console.log("JWT_SECRET:", process.env.JWT_SECRET);
// Connect DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on 🚀 Port ${PORT}`);
});
