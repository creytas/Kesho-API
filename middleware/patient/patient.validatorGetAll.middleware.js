const express = require("express");
const { param, validationResult } = require("express-validator");

const getAllPatientValidator = express();

getAllPatientValidator.use(
  async (req, res, next) => {
    const { limit_start, limit_end } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.limit_start = limit_start;
    res.limit_end = limit_end;
    next();
  }
);

module.exports = getAllPatientValidator;