const express = require("express");
const { registerPatient } = require("../../controllers/patient.controller");
const { body, query, validationResult } = require("express-validator");

const anthropometriqueRegisterMiddleware = express();
const validationData = [
  query("id_patient")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\w{8,}/)
    .withMessage("le nombre de caractère inférieur à 8"),
  body("peri_cranien")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\d{1,}/)
    .withMessage("pas de lettres"),
  body("peri_brachial")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\d{1,}/)
    .withMessage("pas de lettres"),
  // body("declarer_gueri")
  //   .isEmpty()
  //   .withMessage("Empty")
  //   .isBoolean()
  //   .withMessage("c'est un champ boolean"),
  body("poids")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\d{1,}/)
    .withMessage("pas de lettres"),
  body("type_malnutrition").notEmpty().withMessage("Cannot be empty"),
];

anthropometriqueRegisterMiddleware.use(
  validationData,

  async (req, res, next) => {
    const {
      peri_cranien,
      peri_brachial,
      poids,
      taille,
      type_malnutrition,
      id_patient,
      id_user,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
);

module.exports = anthropometriqueRegisterMiddleware;
