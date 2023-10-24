const { Task } = require("../models/tasks");

const getAllTask = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).send(tasks);
};

const createTask = async (req, res) => {
  const { taskName, taskStatus, username } = req.body;
  const task = new Task({ taskName, taskStatus, username });
  await task.save();
  res.status(201).json({
    message: "Task created successfully",
  });
};

const getOneTask = async (req, res) => {
  const taskName = req.params.taskname;
  const task = await Task.find({ taskName });
  if (!task)
    return res.status(404).json({
      message: "Task not found",
    });
  res.status(200).send(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
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
  const task = await Task.deleteOne({ taskName: req.params.taskname });
  res.status(200).json({
    message: "Successfully deleted",
  });
};

module.exports = { getAllTask, createTask, getOneTask, updateTask, deleteTask };
