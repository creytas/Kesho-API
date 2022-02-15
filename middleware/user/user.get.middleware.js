const express = require("express");
const bcrypt = require("bcrypt");
const { param, validationResult } = require("express-validator");

const getUserMiddleware = express();

getUserMiddleware.use(
  [
    param("id").isEmpty().withMessage("paramètre manquant"),
  ],
  (req, res, next) => {
    let { id } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.id = id;
    next();
  }
);

module.exports = getUserMiddleware;
