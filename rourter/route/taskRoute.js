const express = require("express");
const taskRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const { createTask, getTasks, deleteTask , updateTask } = require("../controller/task");

//////////////////////////////

taskRoute.post("/createTask", createTask);
taskRoute.post("/getTasks", getTasks);
taskRoute.post("/deleteTask", deleteTask);
taskRoute.post("/updateTask", updateTask);

/// exports
module.exports = taskRoute;
