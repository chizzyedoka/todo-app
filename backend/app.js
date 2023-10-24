const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const signupRoute = require("./routes/usersignup");
const signinRoute = require("./routes/login");
const taskRoute = require("./routes/tasks");

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
app.use("/signUp", signupRoute);

// sign in
app.use("/signIn", signinRoute);

// task routes
app.use("/task", taskRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});
