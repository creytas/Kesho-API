const express = require("express");
const { body, query,validationResult } = require("express-validator");

const userValidatorStatusMiddleware = express();

userValidatorStatusMiddleware.use(
  [
    query("id_user")
      .notEmpty()
      .withMessage("Cannot be empty")
      .matches(/\d/)
      .withMessage("must contain a number"),
    body("statut")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\w/)
    .withMessage("must contain a number"),
  ],
  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.id_user = req.query.id_user;
    res.statut = req.body.statut;
    next();
  }
);

module.exports = userValidatorStatusMiddleware;
