const express = require("express");
const bcrypt = require("bcrypt");
const { updateUser } = require("../../controllers/user.controller");
const { query, body, validationResult } = require("express-validator");
const validationData = [
  query("id")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\d/)
    .withMessage("must contain a number"),
  body("nom_user")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\D/)
    .withMessage("pas de chiffres"),
  body("prenom_user")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\D/)
    .withMessage("pas de chiffres"),
  body("postnom_user")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\D/)
    .withMessage("pas de chiffres"),
  body("password")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\w/)
    .withMessage("pas de chiffres"),
  body("old_password")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\w/)
    .withMessage("pas de chiffres"),
];

const userUpdateMiddleware = express();

userUpdateMiddleware.use(validationData, (req, res, next) => {
  let { id } = req.query;

  //let { id_user } = req.query;
  let { nom_user, postnom_user, prenom_user, old_password, password } =
    req.body;
  console.log(`${id} ${prenom_user} ${old_password}`);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  password = bcrypt.hashSync(password, 10);
  res.old_password = old_password;
  res.id = id;
  //res.id_user = id_user;
  res.nom_user = nom_user;
  res.postnom_user = postnom_user;
  res.prenom_user = prenom_user;
  res.password = password;
  next();
});

module.exports = userUpdateMiddleware;
