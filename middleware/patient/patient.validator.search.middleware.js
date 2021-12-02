const express = require("express");
const { body, validationResult } = require("express-validator");

const searchPatientValidator = express();
const validationData =  [
    body("nom_patient")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\w/)
    .withMessage("must contain a number"),
]

searchPatientValidator.use(
  validationData,
 
  async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    res.nom_patient = req.body.nom_patient;
    next();
  }
);

module.exports = searchPatientValidator;