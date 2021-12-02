const { getAllPatient, addPatient, getPatient, deletePatient, updatePatient, detailPatient, searchPatient, exportPatient, transfertPatient } = require("../controllers/patient.controller");
const patientDestroyMiddleware = require("../middleware/patient/patient.destroy");
const getPatientMiddleware = require("../middleware/patient/patient.get.middleware");
const updatePatientMiddleware = require("../middleware/patient/patient.update.middleware");
const patientValidatorAdd = require("../middleware/patient/patient.validation.middleware");
const searchPatientValidator = require("../middleware/patient/patient.validator.search.middleware");
const getAllPatientValidator = require("../middleware/patient/patient.validatorGetAll.middleware");
const validatorTransfertPatient = require("../middleware/patient/patient.validatorTransfert.middleware");

const router = require("express").Router();

router.get("/", getPatientMiddleware, getPatient);
router.get("/all",getAllPatientValidator, getAllPatient);
router.get("/export", exportPatient);
router.get("/detail", patientDestroyMiddleware, detailPatient)
// router.delete("/", patientDestroyMiddleware, deletePatient);
router.put("/", updatePatientMiddleware, updatePatient);
router.put("/transfert", validatorTransfertPatient,transfertPatient)
router.post("/", patientValidatorAdd ,addPatient);
router.post("/search", searchPatientValidator, searchPatient);

module.exports = router;
