const { QueryTypes } = require("sequelize");
const queries = require("../operations.sql");
const { matiere_premiere, operation_matiere, sequelize } = require("../models");
const { isEmpty } = require("lodash");

const getAllOperations = async (req, res, next) => {
  await sequelize
    .query(queries.select_operations, { type: QueryTypes.SELECT })
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

const addOperation = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const {
    date_operation,
    matiere_id,
    type_operation,
    qte_operation,
    commentaire_operation,
  } = req.body;

  try {
    const updatedMatiere = await matiere_premiere.update(
      { qte_matiere: req.matiereExist.qte_matiere },
      { where: { id: matiere_id } },
      { transaction }
    );
    if (updatedMatiere) {
      const newOperation = await operation_matiere.create(
        {
          date_operation: Date(date_operation),
          matiere_id: matiere_id,
          type_operation: type_operation,
          qte_operation: qte_operation,
          commentaire_operation: commentaire_operation,
        },
        { transaction }
      );
    } else {
      throw new Error("Matiere error occured");
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
const updateOperation = async (req, res, next) => {};
const deleteAllOperations = async (req, res, next) => {};
const deleteOperationById = async (req, res, next) => {};

module.exports = {
  getAllOperations,
  getOperationById,
  addOperation,
  updateOperation,
  deleteAllOperations,
  deleteOperationById,
};
