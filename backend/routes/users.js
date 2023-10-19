const express = require("express");
const { User } = require("../models/users");

const router = express.Router();
// register a new user
router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // create new user in the database
  const user = new User({ username, password });
  // save the user in the database
  await user.save();
  res.send({ username, password });
});

module.exports = router;
