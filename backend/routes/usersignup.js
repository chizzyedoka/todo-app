const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const { validateUser } = require("../middleware/validate");
const {
  completedTasks,
  pendingTasks,
  deletedTasks,
} = require("../controllers/taskSummary");
const tasks = require("../controllers/task");
const router = express.Router();

// render signup page
router.get("/", (req, res) => {
  res.render("signup", { condition: true }); // Render the signup.ejs file
});

// register a new user
router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // validate request body is valid
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // validate user exists or not
  let user = await User.findOne({ username });
  if (user) return res.status(403).send("User exits already");

  // create new user in the database
  user = new User({ username, password });
  // save the user in the database
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  // console.log({ message: "success", token });
  const maxAge = 3 * 24 * 60 * 60;
  res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.render("welcome", { username });
  // res.render("task", {
  //   completedTasks,
  //   pendingTasks,
  //   deletedTasks,
  //   username,
  //   tasks,
  // });
});

module.exports = router;
