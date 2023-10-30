const express = require("express");
const router = express.Router();
const { Task } = require("../models/tasks");
const auth = require("../middleware/authToken");
const validate = require("../middleware/validate");

const {
  getAllTask,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");

const {
  completedTasks,
  pendingTasks,
  deletedTasks,
} = require("../controllers/taskSummary");

const { findTask } = require("../middleware/task");

// get all tasks
router.get("/", auth, getAllTask);

// get a specific task
router.get("/:taskname", auth, getOneTask);

// create a task
router.post("/", auth, createTask);
// router.post("/", auth, createTask);

// update a task status
router.put("/:taskname", auth, updateTask);

// delete a task
router.delete("/:taskname", auth, findTask, deleteTask);
module.exports = router;
