const express = require("express");
const { body, validationResult } = require("express-validator");

const userValidatorReset = express();

userValidatorReset.use(
  [
    body("email").isEmail().withMessage("mail not valid"),
  ],
  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.email = req.body.email;
    next();
  }
);

module.exports = userValidatorReset;
