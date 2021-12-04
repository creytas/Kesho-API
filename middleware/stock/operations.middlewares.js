const express = require("express");
const { matiere_premiere } = require("../../models");

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

module.exports = {
  matiereExist,
  typeOperation,
};
