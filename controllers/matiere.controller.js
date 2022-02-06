const {
  matiere_premiere,
  matiere_produit,
  operation_matiere,
  sequelize,
} = require("../models");
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
const getMatieresByAffectation = async (req, res, next) => {
  const affectation = req.params.affectation;
  await matiere_premiere
    .findAll({
      where: { affectation: affectation },
    })
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

const addMatiere = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  const {
    libelle_matiere,
    qte_matiere,
    prix_achat,
    affectation,
    date_operation,
    commentaire_operation,
  } = req.body;
  try {
    const matiere = await matiere_premiere.create(
      {
        libelle_matiere: libelle_matiere,
        qte_matiere: qte_matiere,
        prix_achat: prix_achat,
        affectation: affectation,
      },
      { transaction }
    );
    if (matiere) {
      await operation_matiere.create(
        {
          date_operation: Date(date_operation),
          matiere_id: matiere.id,
          type_operation: "entrée",
          qte_operation: matiere.qte_matiere,
          commentaire_operation: commentaire_operation,
        },
        { transaction }
      );
    } else {
      throw new Error("Matiere premiere error occured");
    }

    await transaction.commit().then(() => {
      res.status(200).send({ message: "Success" });
    });
  } catch (error) {
    await transaction.rollback().then(() => {
      res.status(500).send({ message: error.message });
    });
  }
};
const addMatiereQuantity = async (req, res, next) => {};
const updateMatiere = async (req, res, next) => {};
const deleteAllMatieres = async (req, res, next) => {};
const deleteMatiereById = async (req, res, next) => {};

module.exports = {
  getAllMatieres,
  getMatiereById,
  getMatieresByAffectation,
  addMatiere,
  addMatiereQuantity,
  updateMatiere,
  deleteAllMatieres,
  deleteMatiereById,
};
