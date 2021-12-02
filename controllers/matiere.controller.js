const { matiere_premiere, matiere_produit } = require("../models");
const { isEmpty } = require("lodash");

const getAllMatieres = async (req, res, next) => {
  await matiere_premiere
    .findAll()
    .then((data) => {
      if (isEmpty(data)) {
        return res.status(404).send({ message: "matiere not found" });
      }
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};
const getMatiereById = async (req, res, next) => {
  const id = req.params.id;
  await matiere_premiere
    .findByPk(id)
    .then((matiere) => {
      if (isEmpty(matiere)) {
        return res.status(404).send({ message: `matiere ${id} not found` });
      }
      res.status(200).send(matiere);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};
const addMatiere = async (req, res, next) => {};
const updateMatiere = async (req, res, next) => {};
const deleteAllMatieres = async (req, res, next) => {};
const deleteMatiereById = async (req, res, next) => {};

module.exports = {
  getAllMatieres,
  getMatiereById,
  addMatiere,
  updateMatiere,
  deleteAllMatieres,
  deleteMatiereById,
};
