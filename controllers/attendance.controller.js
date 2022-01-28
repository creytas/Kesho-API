const { user, attendance, sequelize } = require("../models");
const queries = require("../operations.sql");

const getAllUserAttendances = async (req, res, next) => {
  try {
    if (req.user.is_admin !== true)
      return res.status(401).send("Access denied. You are not an admin.");

    await sequelize
      .query(queries.select_user_attendances)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch(() => {
        res.status(404).send({ message: "data not found" });
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllUserAttendances,
};
