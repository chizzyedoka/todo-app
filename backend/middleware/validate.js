const express = require("express");
const Joi = require("joi");
const { User } = require("../models/users");

// validate request body is valid
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).max(1000).required(),
  });
  return schema.validate(user);
}

// validate body
function validateBody(body) {
  const schema = Joi.object({
    taskName: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(body);
}

module.exports.validateUser = validateUser;
module.exports.validateBody = validateBody;
