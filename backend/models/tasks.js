const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    minLength: 3,
  },
  taskStatus: {
    type: String,
    enum: ["COMPLETED", "PENDING", "DELETED"],
    default: "pending",
  },
  createdAt: Date,
  username: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports.Task = Task;
