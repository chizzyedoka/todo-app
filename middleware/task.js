const { Task } = require("../models/tasks");
const findTask = async (req, res, next) => {
  const found = await Task.findOne({ taskName: req.params.taskname });
  if (!found) {
    return res.status(404).json({
      message: "Given task doesn't exist",
    });
  }
  next();
};
module.exports = { findTask };
