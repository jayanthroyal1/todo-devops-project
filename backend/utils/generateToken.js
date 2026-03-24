const { JWT_SECRET } = require("../config/env");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

module.exports = generateToken;
