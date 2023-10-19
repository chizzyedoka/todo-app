const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./models/users");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(5000, () => {
  console.log("Listening on port 5000");
});

// connect to mongoose database
mongoose
  .connect("mongodb://0.0.0.0:27017/todo-app-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// register a new user
app.post("/signUp", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // create new user in the database
  const user = new User({ username, password });
  // save the user in the database
  await user.save();
  res.send({ username, password });
});

app.get("/", (req, res) => {
  res.send("Welcome");
});
