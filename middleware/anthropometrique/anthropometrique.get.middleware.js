const express = require("express");
const { param, validationResult } = require("express-validator");

const anthropometriqueGetByIdMiddleware = express();

anthropometriqueGetByIdMiddleware.use(
  [
    param("id_patient").isEmpty().withMessage("paramètre manquant"),

  ],
  async (req, res, next) => {
      
    let { id_patient } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.patientId = id_patient;
    next();
  }
);


module.exports = anthropometriqueGetByIdMiddleware;
