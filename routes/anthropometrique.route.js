const anthropometriqueGetByIdMiddleware = require("../middleware/anthropometrique/anthropometrique.get.middleware");
const anthropometriqueRegisterMiddleware = require("../middleware/anthropometrique/anthropometrique.register.middleware");
const {
  addAnthropometrique,
  getAnthropometriqueByIdPatient,
  updateAnthropometrique,
  deleteAnthropometrique,
} = require("../controllers/anthropometrique.controller");
const router = require("express").Router();

/**
 * @openapi
 * /anthropometrique:
 *      post:
 *          description: Record the patient's anthropometrics
 *          tags:
 *            - anthropometrics
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Nutritional appointment successfully recorded
 */
router.post("/", anthropometriqueRegisterMiddleware, addAnthropometrique);
/**
 * @openapi
 * /anthropometrique:
 *      get:
 *          description: Display all patient's anthropometrics
 *          tags:
 *            - anthropometrics
 *          responses:
 *              200:
 *                  description: Nutritional appointment successfully displayed
 */
router.get(
  "/",
  anthropometriqueGetByIdMiddleware,
  getAnthropometriqueByIdPatient
);
/**
 * @openapi
 * /anthropometrique/{id}:
 *      put:
 *          description: Update the patient's anthropometrics
 *          tags:
 *            - anthropometrics
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: anthropometric id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Nutritional appointment successfully updated
 */
router.put("/:id", updateAnthropometrique);
/**
 * @openapi
 * /anthropometrique/{id}:
 *      delete:
 *          description: Delete the patient's anthropometrics
 *          tags:
 *            - anthropometrics
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: anthropometric id
 *          responses:
 *              200:
 *                  description: Nutritional appointment successfully deleted
 */
router.delete("/:id", deleteAnthropometrique);

module.exports = router;
