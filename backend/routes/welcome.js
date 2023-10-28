const express = require("express");
const router = express.Router();
const auth = require("../middleware/authToken");

router.get("/", auth, (req, res) => {
  const username = req.user.username;
  res.render("welcome", { username });
});

module.exports = router;
