const anthropometriqueGetByIdMiddleware = require("../middleware/anthropometrique/anthropometrique.get.middleware");
const anthropometriqueRegisterMiddleware = require("../middleware/anthropometrique/anthropometrique.register.middleware");
const {
  addAnthropometrique,
  getAnthropometriqueByIdPatient,
} = require("../controllers/anthropometrique.controller");
const router = require("express").Router();

router.post("/", anthropometriqueRegisterMiddleware, addAnthropometrique);
router.get(
  "/",
  anthropometriqueGetByIdMiddleware,
  getAnthropometriqueByIdPatient
);

module.exports = router;
