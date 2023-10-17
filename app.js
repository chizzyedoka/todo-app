const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/todo-app-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
});

const Task = mongoose.model("Task", taskSchema);

const task1 = new Task({
  name: "Leetcode",
});

const task2 = new Task({
  name: "Read",
});

const taskList = [task1, task2];

const taskListSchema = {
  name: { type: String },
  tasks: [
    {
      type: String,
    },
  ],
};

const Item = mongoose.model("Item", taskListSchema);

const item1 = new Item({
  name: "my tasks",
  tasks: taskList,
});

item1.save();

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use((req, res) => {
  res.status(404).render("404");
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
