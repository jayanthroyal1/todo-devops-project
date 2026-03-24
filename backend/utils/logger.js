const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  leve: "info",
  format: format.combine(
    format.timestamp(),
    format.json(), // for structured logs
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

module.exports = logger;
