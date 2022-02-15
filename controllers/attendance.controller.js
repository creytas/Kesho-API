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
//   const transaction = await sequelize.transaction();
//   try {
//     if (req.user.is_admin !== true)
//       return res.status(401).send("Access denied. You are not an admin.");

//     const userFindAll = await user.findAll(
//       {
//         attributes: [
//           "id",
//           "id_user",
//           "nom_user",
//           "postnom_user",
//           "prenom_user",
//           "email",
//           "sexe_user",
//           "is_admin",
//           "statut",
//         ],
//       },
//       { transaction }
//     );
//     console.log(userFindAll);
//     for (const user of userFindAll) {
//       if (userFindAll) {
//         const user_attendance = await attendance.findOne(
//           {
//             where: { user_id: user.dataValues.id },
//           },
//           { transaction }
//         );
//       } else {
//         throw new Error("Attendance error occured");
//       }
//     }
//     await transaction.commit().then(() => {
//       res.status(200).send({ user, user_attendance });
//     });
//   } catch (error) {
//     await transaction.rollback().then(() => {
//       res.status(500).send({ message: error.message });
//     });
//   }
 };

module.exports = {
  getAllUserAttendances,
};
