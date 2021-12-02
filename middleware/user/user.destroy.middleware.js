const express = require("express");
const { query, param, validationResult } = require("express-validator");

const userDestroyMiddleware = express();

userDestroyMiddleware.use(
  [
    query("id_user")
      .notEmpty()
      .withMessage("Cannot be empty")
      .matches(/\d/)
      .withMessage("must contain a number"),
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

module.exports = userDestroyMiddleware;
