const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const { validateUser } = require("../middleware/validate");

const router = express.Router();
// register a new user
router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // validate request body is valid
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // validate user exists or not
  let user = await User.findOne({ username });
  if (user) return res.status(400).send("User exits already");

  // create new user in the database
  user = new User({ username, password });
  // save the user in the database
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.status(201).json({
    message: "User created successfully",
  });
});

module.exports = router;
