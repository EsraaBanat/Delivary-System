const express = require("express");
const taskRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const { createResturant, getResturants, deleteResturant , updateResturant } = require("../controller/resturant");

//////////////////////////////

taskRoute.post("/createResturant", createResturant);
taskRoute.post("/getResturants", getResturants);
taskRoute.post("/deleteResturant", deleteResturant);
taskRoute.post("/updateResturant", updateResturant);

/// exports
module.exports = taskRoute;
