const {
  getAllPatient,
  addPatient,
  getPatient,
  deletePatient,
  updatePatientIdentity,
  updateCauseMalnutrition,
  updateMere,
  updatePere,
  updateMenage,
  UpdateEtatSortie,
  detailPatient,
  searchPatient,
  exportPatient,
  transfertPatient,
} = require("../controllers/patient.controller");
const patientDestroyMiddleware = require("../middleware/patient/patient.destroy");
const getPatientMiddleware = require("../middleware/patient/patient.get.middleware");
const updatePatientMiddleware = require("../middleware/patient/patient.update.middleware");
const patientValidatorAdd = require("../middleware/patient/patient.validation.middleware");
const searchPatientValidator = require("../middleware/patient/patient.validator.search.middleware");
const getAllPatientValidator = require("../middleware/patient/patient.validatorGetAll.middleware");
const validatorTransfertPatient = require("../middleware/patient/patient.validatorTransfert.middleware");

const router = require("express").Router();

/**
 * @openapi
 * /patient:
 *      get:
 *          description: Display all center's patients
 *          tags:
 *            - patients
 *          responses:
 *              200:
 *                  description: Center's raw materials successfully displayed
 */
router.get("/", getPatientMiddleware, getPatient);
router.get("/all", getAllPatientValidator, getAllPatient);
/**
 * @openapi
 * /patient/export:
 *      get:
 *          description: Export .csv all center's patients data
 *          tags:
 *            - patients
 *          responses:
 *              200:
 *                  description: Center's patients data successfully exported
 */
router.get("/export", exportPatient);
/**
 * @openapi
 * /patient/detail:
 *      get:
 *          description: Display all center's patient details
 *          tags:
 *            - patients
 *          responses:
 *              200:
 *                  description: Center's patients details successfully exported
 */
router.get("/detail", patientDestroyMiddleware, detailPatient);
// router.delete("/", patientDestroyMiddleware, deletePatient);
// router.put("/", updatePatientMiddleware, updatePatient);
/**
 * @openapi
 * /patient/transfert:
 *      put:
 *          description: Transfer the patient to a therapeutic unit
 *          tags:
 *            - patients
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: The patient is successfully transfered
 */
router.put("/transfert", validatorTransfertPatient, transfertPatient);
/**
 * @openapi
 * /patient/update-identity/{id}:
 *      put:
 *          description: Update the patient identity
 *          tags:
 *            - patients
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: patient id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: The patient identity is successfully updated
 */
router.put("/update-identity/:id", updatePatientIdentity);
/**
 * @openapi
 * /patient/update-cause/{id}:
 *      put:
 *          description: Update the cause of patient's malnutrition
 *          tags:
 *            - patients
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: patient id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: The cause of the patient's malnutrition is successfully updated
 */
router.put("/update-cause/:id", updateCauseMalnutrition);
/**
 * @openapi
 * /patient/update-mere/{id}:
 *      put:
 *          description: Update patient's mother's data
 *          tags:
 *            - patients
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: patient id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: The patient's mother's data is successfully updated
 */
router.put("/update-mere/:id", updateMere);
/**
 * @openapi
 * /patient/update-pere/{id}:
 *      put:
 *          description: Update patient's father's data
 *          tags:
 *            - patients
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: patient id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: The patient's father's data is successfully updated
 */
router.put("/update-pere/:id", updatePere);
/**
 * @openapi
 * /patient/update-menage/{id}:
 *      put:
 *          description: Update patient's family's background data
 *          tags:
 *            - patients
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: patient id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: The patient's family's background data is successfully updated
 */
router.put("/update-menage/:id", updateMenage);
/**
 * @openapi
 * /patient/update-sortie/{id}:
 *      put:
 *          description: Release the patient
 *          tags:
 *            - patients
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: patient id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Releasing the patient is successfully
 */
router.put("/update-sortie/:id", UpdateEtatSortie);
/**
 * @openapi
 * /patient:
 *      post:
 *          description: Record the patient data
 *          tags:
 *            - patients
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {}
 *          responses:
 *              200:
 *                  description: Patient's data successfully recorded
 */
router.post("/", patientValidatorAdd, addPatient);
/**
 * @openapi
 * /patient/{id}:
 *      delete:
 *          description: Delete the patient's data
 *          tags:
 *            - patients
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: integer
 *              required: true
 *              description: patient id
 *          responses:
 *              200:
 *                  description: Patient's data successfully deleted
 */
router.delete("/:id", deletePatient);
router.post("/search", searchPatientValidator, searchPatient);

module.exports = router;
