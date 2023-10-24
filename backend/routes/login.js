const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/users");

router.post("/", authenticateToken, async (req, res) => {
  // validate body of request
  function validateUser(user) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(5).max(30).required(),
    });
    return schema.validate(user);
  }
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exits in database
  let user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(400).json({
      message: "Invalid email or password",
    });

  // username exits in database, compare passwords
  console.log(req.body.password);
  console.log(user.password);
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      message: "Invalid email or password",
    });

  const token = user.generateAuthToken();

  function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
  // create web token
  //   const token = user.generateAuthToken();

  // set header(headerName,value)
  res.header("x-auth-token", token);
  res.status(200).json(user.username); // doesn't send password to user
});

// sign him in

module.exports = router;
