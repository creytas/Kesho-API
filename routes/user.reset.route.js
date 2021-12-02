const {
    resetPassword,
  } = require("../controllers/user.controller");

  const loginMiddleware = require("../middleware/login.middleware");
  const userValidatorReset = require("../middleware/user/user.validator.reset.middleware");
  
  const router = require("express").Router();
  
  router.post("/", userValidatorReset, resetPassword);

  module.exports = router;
  