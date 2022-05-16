const anthropometriqueGetByIdMiddleware = require("../middleware/anthropometrique/anthropometrique.get.middleware");
const anthropometriqueRegisterMiddleware = require("../middleware/anthropometrique/anthropometrique.register.middleware");
const {
  addAnthropometrique,
  getAnthropometriqueByIdPatient,
  updateAnthropometrique,
  deleteAnthropometrique,
} = require("../controllers/anthropometrique.controller");
const router = require("express").Router();

router.post("/", anthropometriqueRegisterMiddleware, addAnthropometrique);
router.get(
  "/",
  anthropometriqueGetByIdMiddleware,
  getAnthropometriqueByIdPatient
);
router.put("/:id", updateAnthropometrique);
router.delete("/:id", deleteAnthropometrique);

module.exports = router;
