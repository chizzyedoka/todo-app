const express = require("express");
const router = express.Router();
const { Task } = require("../models/tasks");
const {
  getAllTask,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");
const { findTask } = require("../middleware/task");

// get all tasks
router.get("/", getAllTask);

// get a specific task
router.get("/:taskname", getOneTask);

// create a task
router.post("/", createTask);

// update a task status
router.put("/:taskname", updateTask);

// delete a task
router.delete("/:taskname", findTask, deleteTask);
module.exports = router;
