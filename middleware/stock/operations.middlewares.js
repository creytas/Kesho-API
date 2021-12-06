const express = require("express");
const { matiere_premiere, operation_matiere } = require("../../models");

const matiereExist = async (req, res, next) => {
  const matiere_id = req.body.matiere_id;
  let matiereExist = await matiere_premiere.findOne({
    where: {
      id: matiere_id,
    },
  });

  if (!matiereExist) {
    return res.status(404).send({ message: `matiere ${matiere_id} not found` });
  }
  req.matiereExist = matiereExist;
  console.log(`la matiere ${req.matiereExist.id} existe`);
  next();
};

const typeOperation = async (req, res, next) => {
  const { type_operation, qte_operation } = req.body;
  if (type_operation == "sortie") {
    if (qte_operation > req.matiereExist.qte_matiere) {
      return res.status(400).send({
        message: `matiere ${req.matiereExist.libelle_matiere} amount is insuficient`,
      });
    }
    req.matiereExist.qte_matiere = req.matiereExist.qte_matiere - qte_operation;
  } else {
    req.matiereExist.qte_matiere = req.matiereExist.qte_matiere + qte_operation;
  }
  req.matiereExist;
  next();
};

const quantityChange = async (req, res, next) => {
  const operation_id = req.params.id;
  const { type_operation, qte_operation } = req.body;
  let gap = 0;
  const current_operation = await operation_matiere.findOne({
    where: {
      id: operation_id,
    },
  });

  if (!current_operation) {
    return res.status(404).send("Operation not found");
  }
  if (
    current_operation.qte_operation === qte_operation &&
    current_operation.type_operation === type_operation
  ) {
    gap = 0;
  } else {
    gap = current_operation.qte_operation - qte_operation;
  }
  if (type_operation == "sortie") {
    req.matiereExist.qte_matiere = req.matiereExist.qte_matiere + gap;
  } else {
    req.matiereExist.qte_matiere = req.matiereExist.qte_matiere - gap;
  }
  next();
};

module.exports = {
  matiereExist,
  typeOperation,
  quantityChange,
};
