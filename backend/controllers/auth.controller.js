const { registerUser, loginUser } = require("../services/auth.service");
const logger = require("../utils/logger");

const register = async (req, res) => {
  try {
    const data = await registerUser(req.body);
    res.status(201).json(data);
    logger.info("User Registered", data);
  } catch (err) {
    res.status(400).json({ message: err.message });
    logger.error("Unable to Register the User", err.message);
  }
};

const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.status(200).json(data);
    logger.info("User Logged In", data);
  } catch (err) {
    res.status(401).json({ message: err.message });
    logger.error("Unable to Login the User", err.message);
  }
};

module.exports = { register, login };
