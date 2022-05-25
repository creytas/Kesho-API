const express = require("express");
const { matiere_premiere, operation_matiere } = require("../../models");

const matiereExist = async (req, res, next) => {
  const matiere_operation = req.body.matiere_id;

  if (matiere_operation && matiere_operation.length > 0) {
    const matiereExist = await matiere_premiere.findOne({
      where: {
        id: matiere_operation,
      },
    });
    if (!matiereExist) {
      return res
        .status(404)
        .send({ message: `matiere ${matiere_id} not found` });
    }
    req.matiereExist = matiereExist;
    console.log(`*************la matiere ${req.matiereExist.id} existe`);

    next();
  } else {
    throw new Error("Matieres error occured");
  }
};

const typeOperation = async (req, res, next) => {
  const { type_operation, matieres } = req.body;

  for (const matiere of matieres) {
    if (matiere.id === req.matiereExist.id) {
      console.log(
        `the amount of ${req.matiereExist.libelle_matiere} to update is ${matiere.qte_operation}`
      );
      if (type_operation == "sortie") {
        if (matiere.qte_operation > req.matiereExist.qte_matiere) {
          return res.status(400).send({
            message: `matiere ${req.matiereExist.libelle_matiere} amount is insuficient`,
          });
        }
        req.matiereExist.qte_matiere =
          req.matiereExist.qte_matiere - matiere.qte_operation;
      } else {
        req.matiereExist.qte_matiere =
          req.matiereExist.qte_matiere + matiere.qte_operation;
      }
      req.matiereExist;
      req.qte_matiere_operation = matiere.qte_operation;
    }
  }
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
  req.matiereExist = await matiere_premiere.findOne({
    where: { id: current_operation.matiere_id },
  });
  if (!req.matiereExist) {
    return res.status(404).send("Matiere not found");
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
