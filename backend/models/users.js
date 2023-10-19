const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 30,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports.User = User;
