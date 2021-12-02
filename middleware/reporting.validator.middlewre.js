const express = require("express");
const htmlEscape = require("../utils/escapeHtml");
const { body, validationResult } = require("express-validator");

const reportingValidator = express();

reportingValidator.use(
  [body("starting_date")
  .isDate().withMessage("c'est pas une bonne date"),
  body("ending_date")
  .isDate().withMessage("c'est pas une bonne date"),
],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
);

module.exports = reportingValidator;
