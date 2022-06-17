const { QueryTypes } = require("sequelize");
const queries = require("../operations.sql");
const { matiere_premiere, operation_matiere, sequelize } = require("../models");
const { isEmpty } = require("lodash");

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

const getOperationsByAffectation = async (req, res, next) => {
  let { limit_start, limit_end } = req.query;
  const affectation = req.params.affectation;
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

  const data_amount = await operation_matiere.count();
  console.log(limit_end, data_amount);
  await sequelize
    .query(queries.select_operations_by_affectation, {
      replacements: {
        affectationParam: affectation,
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
      res.status(200).send({ operations, data_amount });
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
const getOperationByDate = async (req, res, next) => {
  const date_operation = req.body.date_operation;
  const affectation = req.params.affectation;
  let { date_start, date_end } = res;
  date_start = `${date_operation} 00:00:01`;
  date_end = `${date_operation} 23:59:59`;
  await sequelize
    .query(queries.select_affectation_operations_by_date, {
      replacements: {
        affectationParam: affectation,
        dateParamStart: date_start,
        dateParamEnd: date_end,
      },
      type: QueryTypes.SELECT,
    })
    .then((operations) => {
      if (isEmpty(operations)) {
        return res.status(404).send({
          message: `there is no operation found at ${date_operation}`,
        });
      }
      res.status(200).send(operations);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};
const getMaterialState = async (req, res) => {
  const cornEntrance = await sequelize.query(queries.corn_entrance, {
    type: QueryTypes.SELECT,
  });
  const cornExit = await sequelize.query(queries.corn_exit, {
    type: QueryTypes.SELECT,
  });
  const sorghumEntrance = await sequelize.query(queries.sorghum_entrance, {
    type: QueryTypes.SELECT,
  });
  const sorghumExit = await sequelize.query(queries.sorghum_exit, {
    type: QueryTypes.SELECT,
  });
  const soyEntrance = await sequelize.query(queries.soy_entrance, {
    type: QueryTypes.SELECT,
  });
  const soyExit = await sequelize.query(queries.soy_exit, {
    type: QueryTypes.SELECT,
  });
  const sugarEntrance = await sequelize.query(queries.sugar_entrance, {
    type: QueryTypes.SELECT,
  });
  const sugarExit = await sequelize.query(queries.sugar_exit, {
    type: QueryTypes.SELECT,
  });
  const soapEntrance = await sequelize.query(queries.soap_entrance, {
    type: QueryTypes.SELECT,
  });
  const soapExit = await sequelize.query(queries.soap_exit, {
    type: QueryTypes.SELECT,
  });
  const oilEntrance = await sequelize.query(queries.oil_entrance, {
    type: QueryTypes.SELECT,
  });
  const oilExit = await sequelize.query(queries.oil_exit, {
    type: QueryTypes.SELECT,
  });
  const breadEntrance = await sequelize.query(queries.bread_entrance, {
    type: QueryTypes.SELECT,
  });
  const breadExit = await sequelize.query(queries.bread_exit, {
    type: QueryTypes.SELECT,
  });
  const clothesEntrance = await sequelize.query(queries.clothes_entrance, {
    type: QueryTypes.SELECT,
  });
  const clothesExit = await sequelize.query(queries.clothes_exit, {
    type: QueryTypes.SELECT,
  });
  const foodEntrance = await sequelize.query(queries.food_entrance, {
    type: QueryTypes.SELECT,
  });
  const foodExit = await sequelize.query(queries.food_exit, {
    type: QueryTypes.SELECT,
  });
  const toyEntrance = await sequelize.query(queries.toy_entrance, {
    type: QueryTypes.SELECT,
  });
  const toyExit = await sequelize.query(queries.toy_exit, {
    type: QueryTypes.SELECT,
  });
  const shoesEntrance = await sequelize.query(queries.shoes_entrance, {
    type: QueryTypes.SELECT,
  });
  const shoesExit = await sequelize.query(queries.shoes_exit, {
    type: QueryTypes.SELECT,
  });
  const energyBriquetteEntrance = await sequelize.query(
    queries.energy_briquette_entrance,
    {
      type: QueryTypes.SELECT,
    }
  );
  const energyBriquetteExit = await sequelize.query(
    queries.energy_briquette_exit,
    {
      type: QueryTypes.SELECT,
    }
  );
  const leafExtractEntrance = await sequelize.query(
    queries.leaf_extract_entrance,
    {
      type: QueryTypes.SELECT,
    }
  );
  const leafExtractExit = await sequelize.query(queries.leaf_extract_exit, {
    type: QueryTypes.SELECT,
  });

  const data = [
    {
      designation: cornEntrance ? cornEntrance.libelle_matiere : "maïs",
      entrance: cornEntrance ? cornEntrance.total : 0,
      exit: cornExit ? cornExit.total : 0,
    },
    {
      designation: sorghumEntrance ? sorghumEntrance.libelle_matiere : "sorgho",
      entrance: sorghumEntrance ? sorghumEntrance.total : 0,
      exit: sorghumExit ? sorghumExit.total : 0,
    },
    {
      designation: soyEntrance ? soyEntrance.libelle_matiere : "soja",
      entrance: soyEntrance ? soyEntrance.total : 0,
      exit: soyExit ? soyExit.total : 0,
    },
    {
      designation: sugarEntrance ? sugarEntrance.libelle_matiere : "sucre",
      entrance: sugarEntrance ? sugarEntrance.total : 0,
      exit: sugarExit ? sugarExit.total : 0,
    },
    {
      designation: soapEntrance ? soapEntrance.libelle_matiere : "savon Omo",
      entrance: soapEntrance ? soapEntrance.total : 0,
      exit: soapExit ? soapExit.total : 0,
    },
    {
      designation: oilEntrance ? oilEntrance.libelle_matiere : "huile végétale",
      entrance: oilEntrance ? oilEntrance.total : 0,
      exit: oilExit ? oilExit.total : 0,
    },
    {
      designation: breadEntrance
        ? breadEntrance.libelle_matiere
        : "pains/biscuits",
      entrance: breadEntrance ? breadEntrance.total : 0,
      exit: breadExit ? breadExit.total : 0,
    },
    {
      designation: foodEntrance ? foodEntrance.libelle_matiere : "nourriture",
      entrance: foodEntrance ? foodEntrance.total : 0,
      exit: foodExit ? foodExit.total : 0,
    },
    {
      designation: clothesEntrance
        ? clothesEntrance.libelle_matiere
        : "vêtements",
      entrance: clothesEntrance ? clothesEntrance.total : 0,
      exit: clothesExit ? clothesExit.total : 0,
    },
    {
      designation: toyEntrance ? toyEntrance.libelle_matiere : "jouets",
      entrance: toyEntrance ? toyEntrance.total : 0,
      exit: toyExit ? toyExit.total : 0,
    },
    {
      designation: shoesEntrance ? shoesEntrance.libelle_matiere : "chaussures",
      entrance: shoesEntrance ? shoesEntrance.total : 0,
      exit: shoesExit ? shoesExit.total : 0,
    },
    {
      designation: energyBriquetteEntrance
        ? energyBriquetteEntrance.libelle_matiere
        : "briq. énerg",
      entrance: energyBriquetteEntrance ? energyBriquetteEntrance.total : 0,
      exit: energyBriquetteExit ? energyBriquetteExit.total : 0,
    },
    {
      designation: leafExtractEntrance
        ? leafExtractEntrance.libelle_matiere
        : "extr. foliaires",
      entrance: leafExtractEntrance ? leafExtractEntrance.total : 0,
      exit: leafExtractExit ? leafExtractExit.total : 0,
    },
  ];
  console.log(data);
  return res.status(200).send(data);
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
          parseFloat(matiereExist.qte_matiere) -
          parseFloat(matiere.qte_operation);
      } else if (type_operation === "entrée") {
        matiereExist.qte_matiere =
          parseFloat(matiereExist.qte_matiere) +
          parseFloat(matiere.qte_operation);
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
            date_operation: date_operation,
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
const deleteOperationById = async (req, res, next) => {
  const id = req.params.id;
  if (req.user.is_admin !== true)
    return res.status(400).send("Access denied. You are not an admin.");

  await operation_matiere
    .destroy({
      where: { id: id },
    })
    .then(() => {
      res.status(200).send({ message: `operation ${id} deleted` });
    })
    .catch((error) => {
      res.send({ message: error.message });
    });
};

module.exports = {
  getAllOperations,
  getOperationById,
  getOperationByDate,
  getOperationsByAffectation,
  getMaterialState,
  addOperation,
  updateOperation,
  exportOperation,
  deleteAllOperations,
  deleteOperationById,
};
