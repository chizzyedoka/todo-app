const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/users");
const { validateUser } = require("../middleware/validate");

// render signup page
router.get("/", (req, res) => {
  res.render("login", { condition: true }); // Render the signup.ejs file
});

router.post("/", async (req, res) => {
  // validate body of request
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exits in database
  let user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(400).json({
      message: "Invalid username or password",
    });

  // username exits in database, compare passwords
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      message: "Invalid username or password",
    });

  const token = user.generateAuthToken();
  const username = req.body.username;
  res.render("index", { username });
  // res.status(200).json({
  //   message: `Successfully logged in as ${user.username}`,
  // });
});
// sign him in

module.exports = router;
