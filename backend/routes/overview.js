const express = require("express");
const router = express.Router();
const auth = require("../middleware/authToken");

const {
  completedTasks,
  pendingTasks,
  deletedTasks,
} = require("../controllers/taskSummary");

router.get("/", auth, (req, res) => {
//   console.log(req.body);
//   username = req.body.username;
  console.log(username);
  res.render("overview", {
    completedTasks,
    pendingTasks,
    deletedTasks,
    username,
  });
});

module.exports = router;
