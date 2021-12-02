const express = require("express");
const { query, validationResult } = require("express-validator");
const patientDestroyMiddleware = express();

patientDestroyMiddleware.use([
  query("id_patient")
    .notEmpty()
    .withMessage("id of patient is required")
    .matches(/\d/)
    .withMessage("must contain a number")],
    (req, res, next) => {
    let { id_patient } = req.query 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      
      res.id_patient = id_patient;
      next();
    }
),

module.exports= patientDestroyMiddleware;