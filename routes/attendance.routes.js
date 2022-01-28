const express = require("express");
const attendanceRouter = express.Router();
const attendanceController = require("../controllers/attendance.controller");

attendanceRouter.get("/", attendanceController.getAllUserAttendances);
module.exports = attendanceRouter;
