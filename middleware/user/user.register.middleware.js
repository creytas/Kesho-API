const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const userRegisterMiddleware = express();

const validationMiddlewares = [
    body("email").isEmail(),
    body("nom_user").notEmpty().withMessage("Cannot be empty"),
    body("prenom_user").notEmpty().withMessage("Cannot be empty"),
    body("password")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    body("sexe_user").notEmpty().withMessage("Cannot be empty"),
    body("statut")
      .notEmpty()
      .withMessage("Cannot be empty")
      .matches(/\w/)
      .withMessage("pas de chiffres"),
  ]

userRegisterMiddleware.use(
  validationMiddlewares,
  (req, res, next) => {
    let {
      nom_user,
      postnom_user,
      prenom_user,
      sexe_user,
      email,
      is_admin,
      password,
      statut,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const password_brut = password;
    
    res.password = bcrypt.hashSync(password, 10);
    res.email = email;
    res.nom_user = nom_user;
    res.postnom_user = postnom_user;
    res.prenom_user = prenom_user;
    res.is_admin = is_admin;
    res.sexe_user = sexe_user;
    res.statut = statut;
    res.password_brut = password_brut;
    next();
  }
);

module.exports = userRegisterMiddleware;
