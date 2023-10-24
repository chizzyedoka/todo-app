const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
    maxLength: 1000,
    required: true,
  },
});

// create method for user object
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { name: this.username },
    process.env.ACCESS_TOKEN_SECRET
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
