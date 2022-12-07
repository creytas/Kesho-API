const { resetPassword } = require("../controllers/user.controller");

const loginMiddleware = require("../middleware/login.middleware");
const userValidatorReset = require("../middleware/user/user.validator.reset.middleware");

const router = require("express").Router();
/**
 * @openapi
 * /user/reset:
 *      post:
 *          description: Reset password
 *          tags:
 *              - authentication
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          {email:exemple@exemple.com}
 *          responses:
 *              200:
 *                  description: Your password has been reset successfully
 */
router.post("/", userValidatorReset, resetPassword);

module.exports = router;
