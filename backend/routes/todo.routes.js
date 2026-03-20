const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Todo route working");
});

module.exports = router;
