const { user, attendance, sequelize } = require("../models");
const queries = require("../operations.sql");

const getAllUserAttendances = async (req, res, next) => {
  try {
    if (req.user.is_admin !== true)
      return res.status(401).send("Access denied. You are not an admin.");

    await sequelize.query();
  } catch (error) {}
};
