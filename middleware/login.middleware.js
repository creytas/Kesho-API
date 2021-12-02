const express = require("express");
const { login } = require("../controllers/login.controller");
const htmlEscape = require("../utils/escapeHtml");
const { body, validationResult } = require("express-validator");

const loginMiddleware = express();

loginMiddleware.use(
  [
    body("email").isEmail().withMessage("c'est pas une adresse mail valide"),
    body("password").isLength(5).withMessage("Mot de passe court")
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;

    res.newMail = htmlEscape(email);
    res.newPass = htmlEscape(password);
    next();
});

loginMiddleware.use("/", login);
module.exports = loginMiddleware;