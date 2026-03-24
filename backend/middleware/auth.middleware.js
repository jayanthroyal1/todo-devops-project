const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  console.log("Auth header:", authHeader);

  // ✅ FIXED CONDITION
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  console.log("JWT_SECRET", JWT_SECRET);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("DECODED:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Not Authorized" });
  }
};

module.exports = protect;
