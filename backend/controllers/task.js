const { nextTick } = require("process");
const { Task } = require("../models/tasks");
const { validateBody } = require("../middleware/validate");

function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
}

const getAllTask = async (req, res) => {
  try {
    const username = req.user.name;
    const tasks = await Task.find({ username });
    res.status(200).send(tasks);
  } catch (ex) {
    next(ex);
  }
};

const createTask = async (req, res) => {
  const { error } = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const username = req.user.name;
  console.log(req.body);
  let { taskName, taskStatus } = req.body;
  const task = new Task({ taskName, taskStatus, username });
  console.log(task);
  await task.save();
  res.redirect("/task");
  // res.status(201).json({
  //   message: "Task created successfully",
  // });
};

const getOneTask = async (req, res) => {
  const username = req.user.name;
  const taskName = req.params.taskname;
  const task = await Task.findOne({ taskName, username });
  if (!task)
    return res.status(404).json({
      message: "Task not found",
    });
  res.status(200).send(task);
};

const updateTask = async (req, res) => {
  const username = req.user.name;
  const task = await Task.findOneAndUpdate(
    { username },
    { taskName: req.params.taskname },
    { taskStatus: req.body.taskStatus },
    { new: true }
  );
  if (!task)
    return res.status(404).json({
      message: "Given task doesn't exist",
    });
  res.status(200).send(task);
};

const deleteTask = async (req, res) => {
  const username = req.user.name;
  const task = await Task.findOneAndDelete({
    username,
    taskName: req.params.taskname,
  });
  if (!task) {
    return res.status(404).json({
      message: "Given task doesn't exist",
    });
  }
  res.status(200).json({
    message: "Successfully deleted",
  });
};

module.exports = {
  getAllTask,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
  asyncMiddleware,
};
