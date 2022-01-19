const { QueryTypes } = require("sequelize");
const queries = require("../operations.sql");
const { matiere_premiere, operation_matiere, sequelize } = require("../models");
const { isEmpty } = require("lodash");

// const materialTreatment = async (matiere, type_operation) => {
//   const matiereExist = await matiere_premiere.findOne({
//     where: {
//       id: matiere.id,
//     },
//   });
//   if (!matiereExist) {
//     return res.status(404).send({ message: `matiere ${matiere.id} not found` });
//   }
//   `************* origin matiere ${matiereExist.libelle_matiere} qte ${matiereExist.qte_matiere}`;
//   if (type_operation === "sortie") {
//     if (matiere.qte_operation > matiereExist.qte_matiere) {
//       return res.status(400).send({
//         message: `matiere ${req.matiereExist.libelle_matiere} amount is insuficient`,
//       });
//     }
//     matiereExist.qte_matiere = matiereExist.qte_matiere - matiere.qte_operation;
//   } else if (type_operation === "entrée") {
//     matiereExist.qte_matiere = matiereExist.qte_matiere + matiere.qte_operation;
//   } else {
//     throw new Error("uknown operation type");
//   }
//   console.log(
//     `************* updated matiere ${matiereExist.libelle_matiere} qte ${matiereExist.qte_matiere}`
//   );
//   return { id: matiereExist.id, qte_matiere: matiereExist.qte_matiere };
// };

const getAllOperations = async (req, res, next) => {
  let { limit_start, limit_end } = res;
  const reg = /^\d+$/;
  const testRegexEnd = reg.test(limit_end);
  const testRegexStart = reg.test(limit_start);
  if (
    (!testRegexStart && !testRegexEnd) ||
    (limit_start == 0 && limit_end == 1)
  ) {
    limit_end = 30;
    limit_start = 0;
  } else {
    limit_end = parseInt(limit_end);
    limit_start = parseInt(limit_start);
  }
  await sequelize
    .query(queries.select_operations, {
      replacements: {
        limitParamStart: limit_start,
        limitParamEnd: limit_end,
        plain: true,
      },
      type: QueryTypes.SELECT,
    })
    .then((operations) => {
      if (isEmpty(operations)) {
        return res.status(404).send({ message: "operations not found" });
      }
      res.status(200).send(operations);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};
const getOperationById = async (req, res, next) => {
  const id = req.params.id;
  await sequelize
    .query(queries.select_operations_by_id, {
      replacements: { id: id },
      type: QueryTypes.SELECT,
    })
    .then((operations) => {
      if (isEmpty(operations)) {
        return res.status(404).send({ message: `operation ${id} not found` });
      }
      res.status(200).send(operations);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};
//AJOUT OPERATION
const addOperation = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const { date_operation, matieres, type_operation, commentaire_operation } =
    req.body;
  try {
    for (const matiere of matieres) {
      const matiereExist = await matiere_premiere.findOne({
        where: {
          id: matiere.id,
        },
      });
      if (!matiereExist) {
        return res
          .status(404)
          .send({ message: `matiere ${matiere.id} not found` });
      }
      if (type_operation === "sortie") {
        if (matiere.qte_operation > matiereExist.qte_matiere) {
          return res.status(400).send({
            message: `matiere ${matiereExist.libelle_matiere} amount is insuficient`,
          });
        }
        matiereExist.qte_matiere =
          matiereExist.qte_matiere - matiere.qte_operation;
      } else if (type_operation === "entrée") {
        matiereExist.qte_matiere =
          matiereExist.qte_matiere + matiere.qte_operation;
      } else {
        throw new Error("uknown operation type");
      }

      const updatedMatiere = await matiere_premiere.update(
        { qte_matiere: matiereExist.qte_matiere },
        { where: { id: matiereExist.id } },
        { transaction }
      );
      if (updatedMatiere) {
        const newOperation = await operation_matiere.create(
          {
            date_operation: Date(date_operation),
            matiere_id: matiereExist.id,
            type_operation: type_operation,
            qte_operation: matiere.qte_operation,
            commentaire_operation: commentaire_operation,
          },
          { transaction }
        );
      } else {
        throw new Error("Matiere error occured");
      }
    }
    await transaction.commit().then(() => {
      return res.status(200).send({ message: "Operation added Succefully" });
    });
  } catch (error) {
    await transaction.rollback().then(() => {
      res.status(500).send({ message: error.message });
    });
  }
};

const updateOperation = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const operation_id = req.params.id;
  try {
    const updatedMatiere = await matiere_premiere.update(
      { qte_matiere: req.matiereExist.qte_matiere },
      { where: { id: req.matiereExist.id } },
      { transaction }
    );
    if (updatedMatiere) {
      const newOperation = await operation_matiere.update(
        req.body,
        { where: { id: operation_id } },
        {
          transaction,
        }
      );
      await transaction.commit().then(() => {
        return res
          .status(200)
          .send({ message: `Operation updated Succefully` });
      });
    } else {
      throw new Error("Matiere error occured");
    }
  } catch (error) {
    await transaction.rollback().then(() => {
      res.status(500).send({ message: error.message });
    });
  }
};
const exportOperation = async (req, res, next) => {
  try {
    const Operation = await sequelize.query(queries.export_operations, {
      type: QueryTypes.SELECT,
    });
    if (!Operation) {
      res.status(404).send({ message: "Operation not found" });
    }
    res.status(200).send(Operation);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
    console.log(error);
  }
};
const deleteAllOperations = async (req, res, next) => {};
const deleteOperationById = async (req, res, next) => {};

module.exports = {
  getAllOperations,
  getOperationById,
  addOperation,
  updateOperation,
  exportOperation,
  deleteAllOperations,
  deleteOperationById,
};
