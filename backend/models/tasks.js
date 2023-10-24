const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    minLength: 3,
  },
  taskStatus: {
    type: String,
    enum: ["completed", "pending", "deleted"],
    default: "pending",
  },
  createdAt: Date,
  username: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports.Task = Task;
