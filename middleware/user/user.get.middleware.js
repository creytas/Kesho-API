const express = require("express");
const bcrypt = require("bcrypt");
const { param, validationResult } = require("express-validator");

const getUserMiddleware = express();

getUserMiddleware.use(
  [
    param("id_user").isEmpty().withMessage("paramètre manquant"),
  ],
  (req, res, next) => {
    let { id_user } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.id_user = id_user;
    next();
  }
);

module.exports = getUserMiddleware;
