require("express-async-errors");
const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const signupRoute = require("./routes/usersignup");
const signinRoute = require("./routes/login");
const taskRoute = require("./routes/tasks");
const overviewRoute = require("./routes/overview");
const welcomeRoute = require("./routes/welcome");
const errorHandler = require("./middleware/error");
const app = express();
const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT;

// set EJS as template engine
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log("Listening on port 5000");
});

// connect to mongoose database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// register a new user
app.use("/signup", signupRoute);

// welcome page after signup
app.use("/welcome", welcomeRoute);

// sign in
app.use("/login", signinRoute);

// task routes
app.use("/task", taskRoute);

// overview
app.use("/overview", overviewRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(errorHandler);

app.use("*", (req, res) => {
  res.send("Invalid Url");
});
