const {
  getReporting,
  getReportingByDate,
  reportingYear,
} = require("../controllers/reporting.controller");
const reportingValidator = require("../middleware/reporting.validator.middlewre");

const router = require("express").Router();

router.post("/", reportingValidator, getReportingByDate);
/**
 * @openapi
 * /reporting:
 *      get:
 *          description: Display all center's reports
 *          tags:
 *            - reporting
 *          responses:
 *              200:
 *                  description: Center's reports successfully displayed
 */
router.get("/", getReporting);
/**
 * @openapi
 * /reporting/annuel:
 *      get:
 *          description: Display center's annual reports
 *          tags:
 *            - reporting
 *          responses:
 *              200:
 *                  description: Center's annual reports successfully displayed
 */
router.get("/annuel", reportingYear);

module.exports = router;
